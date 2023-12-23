import { IUser } from "@/shared/types/userTypes";

export interface IUserEditInput extends Omit<IUser, '_id' | 'createdAt'> {}
