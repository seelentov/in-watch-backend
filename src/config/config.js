

const CONFIG = {
	secretJWT:'LHx3dmMIcdDajOQXhQsHLHcCLHx3dmMIcdDajOQXhQsHLHcCLHx3dmMIcdDajOQXhQsHLHcC',
	mongooseConnectionString: 'mongodb+srv://admin:admin@in-watch.hnuxn7t.mongodb.net/in-watch',
	port: '4444',
  cors:{
    origin: process.env.CORS_ORIGIN
  },
  admin:{
    password: 'root',
    login: 'root'
  }
}

export default CONFIG
/**

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
      page,
      page_limit,
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
    } || null

    const totalEntries = await MovieModel.countDocuments(filter);

    let skip = 0;
    if (page && page_limit) {
      skip = (parseInt(page) - 1) * parseInt(page_limit);
    }

    const movies = await MovieModel.find(filter)
      .sort(orderFilter)
      .skip(skip)
      .limit(parseInt(page_limit));

    res.json({
      data: movies,
      page: page,
      count: movies.length, // Длина массива данных
      entries: totalEntries
    });
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Не удалось получить фильмы',
    })
  }
} */