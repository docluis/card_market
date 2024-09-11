export type Card = {
  id: number;
  title: string;
  info: string;
  price: number;
  imageURL: string;
};

export type JwtPayload = {
  data: {
    username: string;
  };
  exp: number;
};

export type User = {
  username: string;
  email: string;
  full_name: string;
  address_street: string;
  address_number: string;
  address_extra: string;
  address_zip: string;
  address_city: string;
  address_country: string;
};

export type Contact = {
  full_name: string;
  email: string;
  phone_number: string;
  message: string;
};