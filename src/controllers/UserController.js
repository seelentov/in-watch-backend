import UserService from '../services/UserService.js'
class UserController{
  async register(req, res){
    try {
      const user = await UserService.register(req.body)
  
      res.json(user)
    } catch (err) {
      console.log(err)
      res.status(err.status).json({
        message: err.message,
      })
    }
  }
  
  async login (req, res) {
    try {
      const user = await UserService.login(req.body)
  
      res.json(user)
    } catch (err) {
      console.log(err)
      res.status(400).json({
        message: err.message,
      })
    }
  }
  
  async getMe (req, res) {
    try {
      console.log(req.userId)
      const user = await UserService.getMe(req.userId)
  
      res.json(user)
    } catch (err) {
      console.log(err)
      res.status(500).json({
        message: err.message,
      })
    }
  }
  
  
  //async update (req, res) {
  //  try {
  //    const user = await UserModel.findByIdAndUpdate(req.userId, {
  //      avatarUrl: req.body.avatarUrl,
  //      login: req.body.login,
  //    }, {
  //      new: true
  //    })
  
  //    if (!user) {
  //      return res.status(404).json({
  //        message: 'Пользователь не найден',
  //      })
  //    }
  
  //    const { passwordHash, ...userData } = user._doc
  
  //    res.json(userData)
  //  } catch (err) {
  //    console.log(err)
  //    return res.status(500).json({
  //      message: 'Нет доступа',
  //    })
  //  }
  //}
}

export default new UserController()


