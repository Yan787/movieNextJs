import { GetStaticProps, NextPage } from 'next'

import Catalog from '@/screens/CatalogMovies/Catalog'

import { IMovie } from '@/shared/types/movieTypes'

import { MovieService } from '@/services/movieService'

const TrendingPage: NextPage<{ movies: IMovie[] }> = ({ movies }) => {
	return (
		<Catalog
			movies={movies || []}
			title="Trending movies"
			description="Trending movies in excellent quality: legal, safe, without ads"
		/>
	)
}

export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data: movies } = await MovieService.getMostPopularMovies()
		return {
			props: { movies },
			revalidate: 60
		}
	} catch (error) {
		return {
			notFound: true,
		}
	}
}

export default TrendingPage
