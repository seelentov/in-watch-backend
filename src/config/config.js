import dotenv from 'dotenv'
dotenv.config();

const CONFIG = {
	secretJWT: process.env.SECRET_JWT,
	mongooseConnectionString: process.env.MONGOOSE_CONNECTION_STRING,
	port: process.env.PORT || '4444',
  cors:{
    origin: process.env.CORS_ORIGIN
  },
  admin:{
    password: process.env.ADMIN_PASS,
    login: process.env.ADMIN_LOGIN,
    secretKey: process.env.ADMIN_SECRET_KEY
  }
}

export default CONFIG