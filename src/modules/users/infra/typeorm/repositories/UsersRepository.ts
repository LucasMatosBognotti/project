import { getRepository, Not, Repository } from 'typeorm';

import IUsersRepository from '../../../repositories/IUsersRepository';
import ICreateUserDto from '../../../dtos/ICreateUserDTO';
import IFindAllProvidersDto from '../../../dtos/IFindAllProvidersDTO';

import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create(dataUser: ICreateUserDto): Promise<User> {
    const user = this.ormRepository.create(dataUser);

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const saveUser = await this.ormRepository.save(user);

    return saveUser;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);
  
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { email } });

    return user;
  }

  public async findByAllProviders({ except_user_id }: IFindAllProvidersDto): Promise<User[] | undefined> {
    let users: User[];

    if (except_user_id) {
      users = await this.ormRepository.find({ where: { id: Not(except_user_id) } });
    } else {
      users = await this.ormRepository.find();
    }

    return users;
  }
}

export default UsersRepository;
