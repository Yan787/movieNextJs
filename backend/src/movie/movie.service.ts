import { Injectable, NotFoundException } from '@nestjs/common'
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types'
import { Types } from 'mongoose'
import { InjectModel } from 'nestjs-typegoose'
import { TelegramService } from 'src/telegram/telegram.service'

import { CreateMovieDto } from './dto/create-movie.dto'
import { MovieModel } from './movie.model'

@Injectable()
export class MovieService {
	constructor(
		@InjectModel(MovieModel) private readonly MovieModel: ModelType<MovieModel>,
		private readonly telegramService: TelegramService
	) {}

	async getAll(searchTerm?: string): Promise<DocumentType<MovieModel>[]> {
		let options = {}

		if (searchTerm) {
			options = {
				$or: [
					{
						title: new RegExp(searchTerm, 'i'),
					},
				],
			}
		}

		return this.MovieModel
			.find(options)
			.select('-updatedAt -__v')
			.sort({ createdAt: 'desc' })
			.populate('genres actors')
			.exec()
	}

	async bySlug(slug: string): Promise<DocumentType<MovieModel>> {
		return this.MovieModel.findOne({ slug }).populate('genres actors').exec()
	}

	async byActor(actorId: Types.ObjectId): Promise<DocumentType<MovieModel>[]> {
		return this.MovieModel.find({ actors: actorId }).exec()
	}

	async byGenres(genreIds: Types.ObjectId[]) {
		const docs = await this.MovieModel.find({ genres: {$in: genreIds} }).exec()
		if (!docs) throw new NotFoundException('Movies not found' )
		return docs
	}

	async updateCountOpened(slug: string) {
		return this.MovieModel
			.findOneAndUpdate({ slug }, { $inc: { countOpened: 1 } })
			.exec()
	}

	/* Admin area */

	async byId(id: string): Promise<DocumentType<MovieModel>> {
		return this.MovieModel.findById(id).exec()
	}

	async create(): Promise<Types.ObjectId> {
		const defaultValue: CreateMovieDto = {
			bigPoster: '',
			actors: [],
			genres: [],
			poster: '',
			title: '',
			videoUrl: '',
			slug: '',
		}
		const movie = await this.MovieModel.create(defaultValue)
		return movie._id
	}

	async update(
		id: string,
		dto: CreateMovieDto
	): Promise<DocumentType<MovieModel> | null> {
		if (!dto.isSendTelegram) {
			dto.isSendTelegram = true
		}

		return this.MovieModel.findByIdAndUpdate(id, dto, { new: true }).exec()
	}

	async delete(id: string): Promise<DocumentType<MovieModel> | null> {
		return this.MovieModel.findByIdAndDelete(id).exec()
	}

	async getMostPopular(): Promise<DocumentType<MovieModel>[]> {
		return this.MovieModel
			.find({ countOpened: { $gt: 0 } })
			.sort({ countOpened: -1 })
			.populate('genres')
			.exec()
	}

	async updateRating(id: string, newRating: number) {
		return this.MovieModel
			.findByIdAndUpdate(id, { rating: newRating }, { new: true })
			.exec()
	}

	// /* Utilites */
	// async sendNotifications(dto: CreateMovieDto) {
	// 	if (process.env.NODE_ENV !== 'development')
	// 		await this.telegramService.sendPhoto(dto.poster)

	// 	const msg = `<b>${dto.title}</b>\n\n` + `${dto.description}\n\n`

	// 	await this.telegramService.sendMessage(msg, {
	// 		reply_markup: {
	// 			inline_keyboard: [
	// 				[
	// 					{
	// 						url: 'https://okko.tv/movie/free-guy',
	// 						text: '🍿 Go to watch',
	// 					},
	// 				],
	// 			],
	// 		},
	// 	})
	// }
}
