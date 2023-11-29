import { User } from '../../user/schema/user.schema';

export class EditAccountInput {
  fullname: string;
}

export class EditAccountOutput {
  message: string;
  user?: User;
}
