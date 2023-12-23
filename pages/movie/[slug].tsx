import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import SingleMovie from '@/screens/SingleMovie/SingleMovie'

import { IGalleryItem } from '@/ui/Gallery/GalleryInterface'

import { IMovie } from '@/shared/types/movieTypes'

import { MovieService } from '@/services/movieService'

import { getMovieUrl } from '@/config/urlConfig'

import Error404 from '../404'

export interface IMoviePage {
	movie: IMovie
	similarMovies: IGalleryItem[]
}

const MoviePage: NextPage<IMoviePage> = ({ movie, similarMovies }) => {
	return movie ? (
		<SingleMovie movie={movie} similarMovies={similarMovies || []} />
	) : (
		<Error404 />
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	try {
		const { data: movie } = await MovieService.getAll()
		const paths = movie.map((m) => ({
			params: { slug: m.slug },
		}))

		return { paths, fallback: 'blocking' }
	} catch {
		return { paths: [], fallback: false }
	}
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
		const { data: movie } = await MovieService.getBySlug(String(params?.slug))
		const { data: responseSimilarMovies } = await MovieService.getByGenres(
			movie.genres.map((m) => m._id),
		)

		const similarMovies: IGalleryItem[] = responseSimilarMovies
			.filter((i) => i._id !== movie._id)
			.map((m) => ({
				name: m.title,
				posterPath: m.poster,
				link: getMovieUrl(m.slug),
			}))

		return {
			props: { movie, similarMovies },
			revalidate: 60
		}
	} catch {
		return {
			notFound: true,
		}
	}
}

export default MoviePage
