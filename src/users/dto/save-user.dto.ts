export class SaveUserDto {
  username: string;
  email: string;
  passwordHash: string;
  roles?: string[];
}
