import { Controller, Put, Body, Get, UseGuards } from '@nestjs/common';
import { AccountService } from './account.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { currentUser } from 'src/common/current-user.decorator';
import { User } from 'src/user/schema/user.schema';
import { EditAccountInput, EditAccountOutput } from './dto/edit-account.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountservice: AccountService) {}

  @UseGuards(AuthGuard)
  @Put()
  editAccount(
    @currentUser() user: User,
    @Body() input: EditAccountInput,
  ): Promise<EditAccountOutput> {
    return this.accountservice.editAccount(user, input);
  }

  @UseGuards(AuthGuard)
  @Get()
  getAccount(@currentUser() user: User): Promise<EditAccountOutput> {
    return this.accountservice.getAccount(user);
  }
}
