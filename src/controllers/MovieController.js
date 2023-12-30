import MovieService from '../services/MovieService.js'
import jwt from 'jsonwebtoken'
import CONFIG from '../config/config.js'

class MovieController{
  async getOne(req, res){
    let userId = ''
    const token = (req?.headers?.authorization || '')?.replace(/Bearer\s?/, '') || ''
    if(token){
      const decoded = jwt.verify(token, CONFIG.secretJWT)
      userId = decoded?._id
    }
    

    try {
      const view = req.query.view
      const id = req.params.id
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