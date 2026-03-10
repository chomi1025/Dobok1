// signup/types.ts
export interface FormType {
  username: string;
  usernameChecked: boolean;
  password: string;
  passwordConfirm: string;
  name: string;
  phone: {
    prefix: string;
    middle: string;
    last: string;
  };
  email: string;
  address: {
    address: string;
    postCode: string;
    detailAddress: string;
  };
  birthDate: string;
  agreeTerms: boolean;
}
