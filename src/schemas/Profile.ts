import mongoose, { Schema, Document } from 'mongoose';

type Profile = Document & {};

const ProfileSchema = new Schema({
	name: { type: String, required: true },
	image: { type: Schema.Types.ObjectId, ref: 'images' },
});

export default mongoose.model<Profile>('profiles', ProfileSchema);
