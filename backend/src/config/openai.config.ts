import OpenAI from 'openai';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OpenAIService implements OnModuleInit {
  private openai: OpenAI;

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
  }

  get client(): OpenAI {
    return this.openai;
  }

  async generateContent(prompt: string, systemPrompt?: string): Promise<string> {
    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [];

    if (systemPrompt) {
      messages.push({ role: 'system', content: systemPrompt });
    }
    messages.push({ role: 'user', content: prompt });

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
      temperature: 0.7,
      max_tokens: 4000,
    });

    return response.choices[0]?.message?.content || '';
  }

  async generatePostFromTopic(topic: string, category: 'blog' | 'newsletter'): Promise<{
    title: string;
    description: string;
    content: string;
  }> {
    const systemPrompt = `Voce e um escritor tecnico especializado em programacao e desenvolvimento web.
Voce escreve em portugues brasileiro de forma clara, objetiva e engajante.
Seu publico sao pessoas que estao aprendendo programacao ou querem migrar para a area de tecnologia.`;

    const prompt = `Crie um ${category === 'blog' ? 'artigo de blog' : 'post de newsletter'} sobre: "${topic}"

Retorne APENAS um JSON valido (sem markdown, sem \`\`\`) com a seguinte estrutura:
{
  "title": "Titulo atrativo e SEO-friendly (max 70 caracteres)",
  "description": "Descricao resumida em 2-3 frases (max 160 caracteres)",
  "content": "Conteudo completo em Markdown com titulos (##), paragrafos, listas e codigo se necessario. Entre 800-1200 palavras."
}`;

    const response = await this.generateContent(prompt, systemPrompt);

    try {
      // Clean response and parse JSON
      const cleanedResponse = response.replace(/```json\n?|\n?```/g, '').trim();
      return JSON.parse(cleanedResponse);
    } catch (error) {
      throw new Error('Falha ao processar resposta da IA');
    }
  }

  async generatePostFromFaq(questions: string[], category: 'blog' | 'newsletter'): Promise<{
    title: string;
    description: string;
    content: string;
  }> {
    const systemPrompt = `Voce e um escritor tecnico especializado em programacao e desenvolvimento web.
Voce escreve em portugues brasileiro de forma clara, objetiva e engajante.
Seu publico sao pessoas que estao aprendendo programacao ou querem migrar para a area de tecnologia.`;

    const questionsFormatted = questions.map((q, i) => `${i + 1}. ${q}`).join('\n');

    const prompt = `Crie um ${category === 'blog' ? 'artigo de blog' : 'post de newsletter'} que responda as seguintes duvidas frequentes:

${questionsFormatted}

Retorne APENAS um JSON valido (sem markdown, sem \`\`\`) com a seguinte estrutura:
{
  "title": "Titulo atrativo que englobe os temas das perguntas (max 70 caracteres)",
  "description": "Descricao resumida em 2-3 frases (max 160 caracteres)",
  "content": "Conteudo completo em Markdown respondendo todas as perguntas de forma organizada. Use titulos (##) para cada pergunta/topico. Entre 800-1500 palavras."
}`;

    const response = await this.generateContent(prompt, systemPrompt);

    try {
      const cleanedResponse = response.replace(/```json\n?|\n?```/g, '').trim();
      return JSON.parse(cleanedResponse);
    } catch (error) {
      throw new Error('Falha ao processar resposta da IA');
    }
  }
}
