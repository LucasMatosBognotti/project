import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import UsersRepository from '../../typeorm/repositories/UsersRepository';
import BCryptHashProvider from '../../../providers/HashProvider/implementations/BCryptHashProvider';

import CreateUserService from '../../../services/CreateUserService';

class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;
  
    const usersRepository = new UsersRepository();
    const hashProvider = new BCryptHashProvider();

    const createUser = new CreateUserService(
      usersRepository,
      hashProvider
    );
  
    const user = await createUser.execute({
      name,
      email,
      password
    });
  
    return res.json(classToClass(user));
  }
}

export default UsersController;
