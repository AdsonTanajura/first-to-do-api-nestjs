import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from 'src/dto/register-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { User } from './entity/user.entity';

@Injectable()
export class UserFactory {
  createUser({ email, name, password }: RegisterUserDto): User {
    const formattedEmail = email.toLowerCase().replace(/\s/g, '');
    const formattedName = name.toLowerCase().trim();
    const userId = 'user-' + uuidv4();

    const userCreated = new User({
      id: userId,
      name: formattedName,
      email: formattedEmail,
      password,
    });

    return userCreated;
  }
}
