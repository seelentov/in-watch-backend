
import MovieModel from '../models/Movie.js'

export const getOne = async (req, res) => {
	try {
    const movieId = req.params.id
    const movie = await MovieModel.findOne({
			_id: movieId,
		}).catch(err=>{
      console.log(err)
		  res.status(500).json({
			message: 'Не удалось получить фильм',
		})
    })
    res.json(movie)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Не удалось получить фильм',
		})
	}
}

export const getAllbyFilter = async (req, res) => {
  try {
    const {
      order,
      orderDir,
      limit,
      yearMin,
      yearMax,
      name,
      ageRating,
      country,
      genres,
      movieLengthMin,
      movieLengthMax,
      ratingMin,
      ratingMax,
      showInBanner
    } = req.query

    const orderFilter = order? { [order]: orderDir === 'asc' ? 1 : -1, } : {}
    const nameFilter = name ? { name: { $regex: name, $options: 'i' } } : {}
    const ageRatingFilter = ageRating ? { ageRating } : {}
    const countryFilter = country ? { country } : {}
    const genresFilter = genres ? { genres:{ $in: genres } } : {}

    const movieLengthMinFilter = movieLengthMin ? { movieLength: {$gte: parseInt(movieLengthMin)} } : {}
    const movieLengthMaxFilter = movieLengthMax ? { movieLength: {$lte: parseInt(movieLengthMax)} } : {}

    const ratingMinFilter = ratingMin ? { rating: {$gte: parseInt(ratingMin)} } : {}
    const ratingMaxFilter = ratingMax ? { rating: {$lte: parseInt(ratingMax)} } : {}

    const yearMinQuery = yearMin ? { year: {$gte: parseInt(yearMin)} } : {}
    const yearMaxQuery = yearMax ? { year: {$lte: parseInt(yearMax)} } : {}

    const showInBannerQuery = showInBanner ? {showInBanner} : {}

    const filter = { 
      ...nameFilter, 
      ...ageRatingFilter, 
      ...genresFilter, 
      ...countryFilter, 
      ...movieLengthMinFilter,
      ...movieLengthMaxFilter,
      ...ratingMinFilter,
      ...ratingMaxFilter, 
      ...yearMinQuery,
      ...yearMaxQuery,
      ...showInBannerQuery
    }

    const movies = await MovieModel.find(filter)
      .sort(orderFilter)
      .limit(parseInt(limit))

    res.json(movies)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Не удалось получить фильмы',
    })
  }
}