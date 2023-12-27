import MovieService from '../services/MovieService.js'

class MovieController{
  async getOne(req, res){
    try {
      const id = req.params.id
      const movie = await MovieService.getOne(id)
      res.json(movie)
    } catch (err) {
      console.log(err)
      res.status(500).json({
        message: 'Не удалось получить фильм',
      })
    }
  }
  
  async getAllbyFilter (req, res) {
    try {
      const query = req.query
      const movies = await MovieService.getAllbyFilter(query)
      res.json(movies)
    } catch (err) {
      console.log(err)
      res.status(500).json({
        message: 'Не удалось получить фильмы',
      })
    }
  }
}



export default new MovieController()