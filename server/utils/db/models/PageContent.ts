import mongoose from 'mongoose';

const seoSchema = new mongoose.Schema({
  title: {
    ar: { type: String, default: '' },
    en: { type: String, default: '' },
  },
  description: {
    ar: { type: String, default: '' },
    en: { type: String, default: '' },
  },
  keywords: {
    ar: { type: String, default: '' },
    en: { type: String, default: '' },
  },
}, { _id: false });

const contentSchema = new mongoose.Schema({
  heading: {
    ar: { type: String, default: '' },
    en: { type: String, default: '' },
  },
  subheading: {
    ar: { type: String, default: '' },
    en: { type: String, default: '' },
  },
  body: {
    ar: { type: String, default: '' },
    en: { type: String, default: '' },
  },
  image: { type: String, default: '' },
  images: [{ type: String }],
}, { _id: false });

const pageContentSchema = new mongoose.Schema({
  page: {
    type: String,
    required: true,
    unique: true,
    enum: ['home', 'hotels', 'about', 'contact'],
  },
  seo: {
    type: seoSchema,
    default: () => ({}),
  },
  content: {
    type: contentSchema,
    default: () => ({}),
  },
}, {
  timestamps: true,
});

export default mongoose.models.PageContent || mongoose.model('PageContent', pageContentSchema);
