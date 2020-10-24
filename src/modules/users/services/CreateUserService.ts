import User from "../infra/typeorm/entities/User";

import IHashProvider from "../providers/HashProvider/models/IHashProvider";
import IUsersRepository from "../repositories/IUsersRepository";

import AppError from "../../../shared/errors/AppError";

interface IResquest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  private usersRepository: IUsersRepository;
  private hashProvider: IHashProvider;

  constructor (usersRepository: IUsersRepository, hashProvider: IHashProvider) {
    this.usersRepository = usersRepository;
    this.hashProvider = hashProvider;
  }

  public async execute({ name, email, password }: IResquest): Promise<User> {
    const checkEmailExist = await this.usersRepository.findByEmail(email);

    if (checkEmailExist) {
      throw new AppError('Email adress already used');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword
    });

    return user;
  }

}

export default CreateUserService;
