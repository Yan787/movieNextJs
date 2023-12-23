import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import Catalog from '@/screens/CatalogMovies/Catalog'

import { IGenre, IMovie } from '@/shared/types/movieTypes'

import { GenreService } from '@/services/genreService'
import { MovieService } from '@/services/movieService'

import Error404 from '../404'

interface IGenrePage {
	movies: IMovie[]
	genre: IGenre | undefined
}

const GenrePage: NextPage<IGenrePage> = ({ movies, genre }) => {
	return genre ? (
		<Catalog
			movies={movies}
			title={genre.name}
			description={genre.description}
		/>
	) : (
		<Error404 />
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	try {
		const { data: genres } = await GenreService.getAll()
		const paths = genres.map((g) => ({
			params: { slug: g.slug },
		}))

		return {
			paths,
			fallback: 'blocking',
		}
	} catch (e) {
		return {
			paths: [],
			fallback: false,
		}
	}
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
		const { data: genre } = await GenreService.getBySlug(String(params?.slug))
		const { data: movies } = await MovieService.getByGenres([genre._id])

		return {
			props: { genre, movies },
			revalidate: 60
		}
	} catch (error) {
		return {
			notFound: true,
		}
	}
}

export default GenrePage
