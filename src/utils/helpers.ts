import { User } from "../types";
import userData from "../data/users.json";
import groupData from "../data/groups.json";

export const findUser = (userId: number): User | undefined => {
  const { users } = userData;
  return users.find((user) => user.id === userId);
};

export const findGroupName = (groupId: number): string | undefined => {
  const { groups } = groupData;
  const group = groups.find((group) => group.id === groupId);
  return group?.name;
};
