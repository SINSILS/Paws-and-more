export interface User {
  email: string;
  username: string;
  role: "SUPER_ADMIN" | "ADMIN" | "USER";
  id: string;
}

export interface AnimalType {
  name: string;
  description: string;
  id: string;
}

export interface Topic {
  title: string;
  description: string;
  id: string;
}

export interface Post {
  title: string;
  content: string;
  id: string;
  ownerUserId: string;
  ownerUser: { username: string };
}
