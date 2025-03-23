import { UserResponseDto } from '../dto/user-response.dto';

export const toUserResponseDto = (user: any): UserResponseDto => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    provider: user.provider,
    avatar: user.avatar,
    createdAt: user.createdAt,
  };
};
