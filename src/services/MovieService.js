import MovieModel from '../models/Movie.js'

class MovieService{
  async getOne(id, queries){
    let movie
    if(queries.view){
       movie = await MovieModel.findByIdAndUpdate(
        id,
        {
          $inc: { views: 1, viewsMonth: 1 },
        },
        { new: true }
        ).catch(err=>{
        throw new Error('Не удалось получить фильм')
      })
    }else{
       movie = await MovieModel.findOne({
        _id: id,
      }).catch(err=>{
        throw new Error('Не удалось получить фильм')
      })
    }

    return movie
  }

  async getAllbyFilter (query) {
    
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
      } = query
  
      

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
  
      //const movies = await MovieModel.find(filter)
      //  .sort(orderFilter)
      //  .skip(skip)
      //  .limit(parseInt(page_limit));

           const movies = await MovieModel.find(filter)
        .sort(orderFilter)
        .skip(skip)
        .limit(parseInt(page_limit));
  

      return {
        data: movies,
        page: page || 1,
        pages: Math.ceil(totalEntries / page_limit) || 1,
        count: movies.length,
        entries: totalEntries
      };
  }
}

export default new MovieService()