export interface ProfileEditFormType {
  password?: string;
  passwordConfirm?: string;
  name: string;
  phone: {
    prefix: string;
    middle: string;
    last: string;
  };
  email: string;
  address: {
    address: string;
    zipCode: string;
    address2: string;
  };
  birthDate: string;
}
