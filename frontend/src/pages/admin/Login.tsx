import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../contexts/AuthContext';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import './Login.css';

interface LoginFormData {
  email: string;
  password: string;
}

function Login() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();

  // Redirect if already logged in
  if (user) {
    const from = (location.state as any)?.from?.pathname || '/admin';
    navigate(from, { replace: true });
  }

  const onSubmit = async (data: LoginFormData) => {
    setError(null);
    setLoading(true);

    try {
      await login(data.email, data.password);
      const from = (location.state as any)?.from?.pathname || '/admin';
      navigate(from, { replace: true });
    } catch (err: any) {
      console.error('Login error:', err);
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password') {
        setError('Email ou senha incorretos');
      } else if (err.code === 'auth/user-not-found') {
        setError('Usuario nao encontrado');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Muitas tentativas. Tente novamente mais tarde.');
      } else {
        setError('Erro ao fazer login. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="login__container">
        <div className="login__header">
          <Link to="/" className="login__logo">
            <img src="/figma/Group.png" alt="DevClub" />
            <span>DevClub</span>
          </Link>
          <h1 className="login__title">Admin Login</h1>
          <p className="login__subtitle">Entre com suas credenciais para acessar o painel</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="login__form">
          {error && (
            <div className="login__error">
              {error}
            </div>
          )}

          <div className="login__field">
            <label htmlFor="email" className="login__label">Email</label>
            <input
              type="email"
              id="email"
              className={`login__input ${errors.email ? 'login__input--error' : ''}`}
              placeholder="seu@email.com"
              {...register('email', {
                required: 'Email e obrigatorio',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Email invalido',
                },
              })}
            />
            {errors.email && (
              <span className="login__field-error">{errors.email.message}</span>
            )}
          </div>

          <div className="login__field">
            <label htmlFor="password" className="login__label">Senha</label>
            <div className="login__password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className={`login__input ${errors.password ? 'login__input--error' : ''}`}
                placeholder="********"
                {...register('password', {
                  required: 'Senha e obrigatoria',
                  minLength: {
                    value: 6,
                    message: 'Senha deve ter no minimo 6 caracteres',
                  },
                })}
              />
              <button
                type="button"
                className="login__password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <span className="login__field-error">{errors.password.message}</span>
            )}
          </div>

          <button
            type="submit"
            className="login__submit"
            disabled={loading}
          >
            {loading ? (
              <span className="login__loading">Entrando...</span>
            ) : (
              <>
                <LogIn size={20} />
                <span>Entrar</span>
              </>
            )}
          </button>
        </form>

        <div className="login__footer">
          <Link to="/" className="login__back">
            Voltar ao site
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
