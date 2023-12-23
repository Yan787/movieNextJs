import { Injectable, NotFoundException } from '@nestjs/common'
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types'
import { InjectModel } from 'nestjs-typegoose'
import { MovieModel } from 'src/movie/movie.model'
import { MovieService } from 'src/movie/movie.service'
import { CreateGenreDto } from './dto/create-genre.dto'
import { GenreModel } from './genre.model'
import { ICollection } from './interfaces/genre.interface'

@Injectable()
export class GenreService {
	constructor(
		@InjectModel(GenreModel) private readonly GenreModel: ModelType<GenreModel>,
		private readonly movieService: MovieService
	) {}

	async getAll(searchTerm?: string): Promise<DocumentType<GenreModel>[]> {
		let options = {}

		if (searchTerm) {
			options = {
				$or: [
					{
						name: new RegExp(searchTerm, 'i'),
					},
					{
						slug: new RegExp(searchTerm, 'i'),
					},
					{
						description: new RegExp(searchTerm, 'i'),
					},
				],
			}
		}

		return this.GenreModel
			.find(options)
			.select('-updatedAt -__v')
			.sort({ createdAt: 'desc' })
			.exec()
	}


	async bySlug(slug: string) {
		return this.GenreModel.findOne({ slug }).exec()
	}

	async getPopular(): Promise<DocumentType<GenreModel>[]> {
		return this.GenreModel
			.find()
			.select('-updatedAt -__v')
			.sort({ createdAt: 'desc' })
			.exec()
	}
	
	async getCollections() {
		const genres = await this.getAll()
		const collections = await Promise.all(
			genres.map(async (genre) => {
				const moviesByGenre = await this.movieService.byGenres([genre._id])

				const result: ICollection = {
					_id: String(genre._id),
					image: moviesByGenre[0]?.bigPoster,
					slug: genre.slug,
					title: genre.name,
				}

				return result
			})
		)

		return collections
	}

		/* Admin area */

	async create() {
		const defaultValue: CreateGenreDto = {
			description: '',
			icon: '',
			name: '',
			slug: '',
		}
		const genre = await this.GenreModel.create(defaultValue)
		return genre._id
	}

	async byId(_id: string) {
		const genre = await this.GenreModel.findById(_id)
		if (!genre) throw new NotFoundException('Genre not found')
		return genre
	}

	async update(_id: string, dto: CreateGenreDto) {
		return this.GenreModel.findByIdAndUpdate(_id, dto, {
			new: true
		}).exec()
	}

	async delete(id: string) {
		return this.GenreModel.findByIdAndDelete(id).exec()
	}
}
