export interface User {
  id: number;
  name: string;
  username: string;
  password: string;
  picture: string;
}

export interface Group {
  id: number;
  name: string;
  picture: string;
}

export interface Post {
  id: number;
  userId: number;
  groupId: number;
  message: string;
}
