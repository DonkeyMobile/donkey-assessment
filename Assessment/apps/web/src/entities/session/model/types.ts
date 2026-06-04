import type { UserRole } from "@donkey/shared";

export interface ServerSession {
  user: {
    id: string;
    email: string;
    name: string;
    role: UserRole;
  };
}
