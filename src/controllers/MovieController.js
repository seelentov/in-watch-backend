import MovieService from '../services/MovieService.js'

class MovieController{
  async getOne(req, res){
    try {
      const view = req.query.view
      const id = req.params.id
      const userId = req.userId || ''
      const movie = await MovieService.getOne(id, view, userId)
      res.json(movie)
    } catch (err) {
      console.log(err)
      res.status(500).json({
        message: err.message,
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
        message: err.message,
      })
    }
  }
}



export default new MovieController()