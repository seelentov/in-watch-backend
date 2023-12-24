const CONFIG = {
	secretJWT: 'LHx3dmMIcdDajOQXhQsHLHcCLHx3dmMIcdDajOQXhQsHLHcCLHx3dmMIcdDajOQXhQsHLHcC',
	mongooseConnectionString:'mongodb+srv://admin:admin@in-watch.hnuxn7t.mongodb.net/in-watch',
	port: process.env.PORT || '4444',
  cors:{
    origin: 'https://localhost:3000/'
  },
  admin:{
    password: 'root',
    login: 'root'
  }
}

export default CONFIG
