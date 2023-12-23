import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import Catalog from '@/screens/CatalogMovies/Catalog'

import { IActor, IMovie } from '@/shared/types/movieTypes'

import { ActorService } from '@/services/actorService'
import { MovieService } from '@/services/movieService'

import Error404 from '../404'

interface IActorPage {
	actor: IActor
	movies: IMovie[]
}

const ActorPage: NextPage<IActorPage> = ({ actor, movies }) => {
	return actor ? <Catalog movies={movies} title={actor.name} /> : <Error404 />
}

export const getStaticPaths: GetStaticPaths = async () => {
	try {
		const { data: actors } = await ActorService.getAll()
		const paths = actors.map((g) => ({
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
		const { data: actor } = await ActorService.getBySlug(String(params?.slug))

		const { data: movies } = await MovieService.getByActor(actor._id)

		return {
			props: { movies, actor },
			revalidate: 60
		}
	} catch (e) {
		return {
			notFound: true,
		}
	}
}

export default ActorPage
