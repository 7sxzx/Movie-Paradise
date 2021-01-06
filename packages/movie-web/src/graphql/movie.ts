import { Query, Resolver } from 'type-graphql'
import Movie from '../entity/Movie'
import MovieServiceImpl from '../service/movie-service'

@Resolver(Movie)
export default class MovieResolver {
  constructor (private readonly movieService: MovieServiceImpl) {
    if (movieService === undefined) {
      this.movieService = new MovieServiceImpl()
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  @Query(returns => [Movie])
  async getNewestMovie () {
    return this.movieService.getNewest()
  }
}
