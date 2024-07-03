export class CreateUserRequestDto {
  fullname: string;
  email: string;
  phone: string;
  address: string;
  detail: {
    item_id: number;
    measurement_date: Date;
  };
}
