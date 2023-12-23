import { IUser } from "@/shared/types/userTypes";

export interface IProfileInput extends Pick<IUser, 'email' | 'password'> {}
