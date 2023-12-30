import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
	{
		login: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
      unique: true,
		},
		passwordHash: {
			type: String,
			required: true,
		},
    avatarUrl: String,
    role: {
      type: String,
      required: true,
    },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
    receit: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
    userSalt:{
      type: String,
      required: true,
    },
	},
	{
		timestamps: true,
	}
)

export default mongoose.model('User', UserSchema)
