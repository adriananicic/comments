import { UserDbActions } from '../repository/interface/userdbInterface';

export class UserController {
  private userRepository: UserDbActions;

  constructor(userRepo: UserDbActions) {
    this.userRepository = userRepo;
  }

  async getAllUsers() {
    try {
      const users = await this.userRepository.listUsers();
      return users;
    } catch (error: any) {
      const err_msg = 'Unexpected error occured while fetching users.';
      console.error(`${err_msg}\nError message: ${error.message}`);
      throw new Error(err_msg);
    }
  }
}
