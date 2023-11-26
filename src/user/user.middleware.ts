import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';
import { JwtService } from 'src/jwt/jwt.service';
import { NextFunction } from 'express';
import { log } from 'console';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const TOKEN_HEADER_KEY = 'authorization';
    const TOKEN_PREFIX = 'Bearer';

    if (TOKEN_HEADER_KEY in req.headers) {
      const token = req.headers[TOKEN_HEADER_KEY].toString()
        .replace(TOKEN_PREFIX, '')
        .trim();

      const decode = await this.jwtService.verify(token.toString());

      const user = await this.userModel.findById(decode['userId']);

      if (!user) throw new UnauthorizedException();

      req['user'] = user;
    }

    next();
  }
}
