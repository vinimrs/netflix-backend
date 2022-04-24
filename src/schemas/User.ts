import mongoose, { Document, Schema } from 'mongoose';

type User = Document & {};

export interface IUser extends Document {
	name: string;
	email: string;
	passwordHash: string;
	verifiedEmail: boolean;
	profiles: { name: string; image: number }[];
}

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

export default mongoose.model<IUser>('users', UserSchema);
