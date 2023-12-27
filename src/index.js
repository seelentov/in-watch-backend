import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import CONFIG from './config/config.js'
import router from './router.js'

mongoose
  .connect(CONFIG.mongooseConnectionString)
  .then(() => {
    console.log('MongoDB OK');
  })
  .catch((err) => {
    console.log(`MongoDB ERR: ${err}`);
  });

const app = express();

app.use(cors())
app.use(express.json());
app.use('/api', router);

app.use('../uploads', express.static('uploads'))

app.listen(CONFIG.port, (err) => {
  if (err) {
    return console.log(`Server ERR: ${err}`);
  }
  return console.log('Server OK');
});
