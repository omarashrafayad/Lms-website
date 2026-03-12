import mongoose, { Document, Types, Schema } from "mongoose";

export interface IBlog extends Document {
    title: string;
    slug: string;
    content: string;
    imageCover: string;
    author: Types.ObjectId;
    category: string;
    views: number;
}

const blogSchema = new mongoose.Schema<IBlog>(
    {
        title: {
            type: String,
            required: [true, 'Blog title is required'],
            trim: true,
        },
        slug: {
            type: String,
            lowercase: true,
        },
        content: {
            type: String,
            required: [true, 'Blog content is required'],
        },
        imageCover: {
            type: String,
            required: [true, 'Blog image cover is required'],
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        views: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

const setImageURL = (doc: IBlog) => {
    if (doc.imageCover) {
        const imageUrl = `${process.env.BASE_URL}/blogs/${doc.imageCover}`;
        doc.imageCover = imageUrl;
    }
};

blogSchema.post('init', (doc) => {
    setImageURL(doc);
});

blogSchema.post('save', (doc) => {
    setImageURL(doc);
});

const Blog = mongoose.model<IBlog>('Blog', blogSchema);
export default Blog;
