import { IActor } from "@/shared/types/movieTypes";

export interface IActorEditInput extends Omit<IActor, '_id'> {}
