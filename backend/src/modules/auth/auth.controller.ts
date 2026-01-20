import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '../../common/guards/auth.guard';
import { FirebaseService } from '../../config/firebase.config';
import { IsString, IsNotEmpty } from 'class-validator';

class VerifyTokenDto {
  @IsString()
  @IsNotEmpty()
  idToken: string;
}

@Controller('auth')
export class AuthController {
  constructor(private firebaseService: FirebaseService) {}

  @Post('verify')
  async verifyToken(@Body() verifyTokenDto: VerifyTokenDto) {
    try {
      const decodedToken = await this.firebaseService.auth.verifyIdToken(
        verifyTokenDto.idToken,
      );
      return {
        valid: true,
        uid: decodedToken.uid,
        email: decodedToken.email,
      };
    } catch (error) {
      return {
        valid: false,
        error: 'Token invalido ou expirado',
      };
    }
  }

  @UseGuards(AuthGuard)
  @Get('me')
  async getCurrentUser(@Request() req: any) {
    try {
      const user = await this.firebaseService.auth.getUser(req.user.uid);
      return {
        uid: user.uid,
        email: user.email,
        displayName: (user as any).displayName || null,
        photoURL: (user as any).photoURL || null,
      };
    } catch (error) {
      return {
        uid: req.user.uid,
        email: req.user.email,
      };
    }
  }
}
