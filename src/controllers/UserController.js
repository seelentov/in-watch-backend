import UserService from '../services/UserService.js'
class UserController{
  async register(req, res){
    try {
      const user = await UserService.register(req.body)
  
      return res.json(user)
    } catch (err) {
      console.log(err)
      return res.status(err.status || 500).json({
        message: err.message || 'Нет доступа',
      })
    }
  }
  
  async login (req, res) {
    try {
      const user = await UserService.login(req.body)
      return res.json(user)
    } catch (err) {
      console.log(err)
      return res.status(err.status || 500).json({
        message: err.message || 'Нет доступа',
      })
    }
  }
  
  async getMe (req, res) {
    try {
      const user = await UserService.getMe(req.userId)
  
      res.json(user)
    } catch (err) {
      console.log(err)
      return res.status(err.status || 500).json({
        message: err.message || 'Нет доступа',
      })
    }
  }
  
  
  async updateFav (req, res) {
    try {
      const userId = req.userId
      const action = req.query.action
      const ids = req.body.ids

      const user = await UserService.updateFav(action, ids, userId)
  
      res.json(user)
    } catch (err) {
      console.log(err)
      return res.status(err.status || 500).json({
        message: err.message || 'Нет доступа',
      })
    }
  }

  async updateInfo (req, res) {
    try {
      const userId = req.userId

      const user = await UserService.updateInfo(userId, req.body)
  
      res.json(user)
    } catch (err) {
      console.log(err)
      return res.status(err.status || 500).json({
        message: err.message || 'Нет доступа',
      })
    }
  }

  async changePass (req, res) {
    try {
      const userId = req.userId

      await UserService.changePass(userId, req.body)
  
      res.status(200).json({
        success: true,
      })
    } catch (err) {
      console.log(err)
      return res.status(err.status || 500).json({
        message: err.message || 'Нет доступа',
      })
    }
  }
}

export default new UserController()


