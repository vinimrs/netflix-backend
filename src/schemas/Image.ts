import mongoose, { Document, Schema } from 'mongoose';

// type Image = Document & {};
interface Image extends Document {
  image: {
    data: Buffer;
    contentType: string;
  };
  _id: mongoose.ObjectId;
}

const ImageSchema = new Schema({
  data: Buffer,
  contentType: String,
});

export default mongoose.model<Image>('images', ImageSchema);
