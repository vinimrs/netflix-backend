import mongoose, { Document, Schema } from 'mongoose';

type User = Document & {};

const UserSchema = new Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true },
		passwordHash: { type: String, required: true },
		verifiedEmail: { type: Boolean },
		profiles: [
			{
				name: { type: String, required: true },
				image: { type: Schema.Types.ObjectId, ref: 'images' },
			},
		],
	},
	{
		timestamps: true,
	}
);

export default mongoose.model<User>('users', UserSchema);
