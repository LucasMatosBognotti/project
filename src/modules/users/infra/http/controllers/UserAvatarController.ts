import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import UsersRepository from '../../typeorm/repositories/UsersRepository';
import DiskStorageProvider from '../../../../../shared/providers/StorageProvider/implementations/DiskStorageProvider';

import UpdateUserAvatarService from '../../../services/UpdateUserAvatarService';
 
class UserAvatarController {
  public async update(req: Request, res: Response): Promise<Response> {
    const { user_id } = req.body;
    const avatarFileName = req.file.filename;

    const usersRepository = new UsersRepository();
    const diskStorage = new DiskStorageProvider();

    const updateUserAvatar = new UpdateUserAvatarService(
      usersRepository,
      diskStorage,
    );

    const user = await updateUserAvatar.execute({
      user_id,
      avatarFileName
    });

    return res.json(classToClass(user));
  }
}

export default UserAvatarController;
