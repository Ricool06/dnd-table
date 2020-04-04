export interface SetImageMessage {
  image: string;
}

export interface User {
  username: string;
  password: string;
}

export interface JwtPayload {
  name: string;
}
