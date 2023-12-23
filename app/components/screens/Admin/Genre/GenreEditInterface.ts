import { IGenre } from '@/shared/types/movieTypes'

export interface IGenreEditInput extends Omit<IGenre, '_id'> {}
