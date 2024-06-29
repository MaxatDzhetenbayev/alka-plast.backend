export class CreateUserRequestDto {
  fullname: string;
  email: string;
  phone: string;
  address: string;
  detail: {
    model: string;
    status: string;
  };
}
