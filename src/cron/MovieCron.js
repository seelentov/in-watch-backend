import cron from 'node-cron';
import MovieService from '../services/MovieService.js'

class MovieCron{
  resetViewsMonth(){
    cron.schedule('59 23 28-31 * *', MovieService.resetViewsMonth, {
      scheduled: true,
      timezone: 'Europe/Moscow',
    });
  }
}


export default new MovieCron()