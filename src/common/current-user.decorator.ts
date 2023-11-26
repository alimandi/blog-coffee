import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from 'src/user/schema/user.schema';

export const currentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();

    const user = req['user'] as User;

    return user;
  },
);
