import mongoose from 'mongoose';
const { Schema } = mongoose;

const blogSchema = new Schema({
  title: String, 
  excerpt: String,
  date: { type: Date},
  slug: String,
 
});
export const blogs = mongoose.model('ؤlogs', blogSchema, 'Blogs');
