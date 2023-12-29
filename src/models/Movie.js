import mongoose from 'mongoose'

const MovieSchema = new mongoose.Schema(
	 {
		name: {
			type: String,
			required: true,
		},
    poster: {
			type: String,
			required: true,
		},
    backdrop: {
			type: String,
			required: true,
		},
    movieLength: {
			type: Number,
			required: true,
		},
    rating: {
			type: Number,
			required: true,
		},
    year: {
			type: Number,
			required: true,
		},
    description:{
      type: String,
			required: true,
    },
    ageRating:{
      type: Number,
			required: true,
    },
    country:{
      type: String,
			required: true,
    },
    trailer:{
      type: String,
			required: true,
    },
    genres:{
      type: [String],
			required: true,
    },
    showInBanner:{
      type: Boolean
    },
    likes:{
      type: Number,
      default: 0,
			required: true,
    },
    views:{
      type: Number,
      default: 0,
			required: true,
    },
    viewsMonth:{
      type: Number,
      default: 0,
			required: true,
    },
	},
	{
		timestamps: true,
	}
)

export default mongoose.model('Movie', MovieSchema)
