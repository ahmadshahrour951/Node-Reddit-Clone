const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  summary: { type: String, required: true },
  subreddit: { type: String, required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  author : { type: Schema.Types.ObjectId, ref: "User", required: true },
  posts : [{ type: Schema.Types.ObjectId, ref: "Post" }],
  createdAt: { type: Date },
  updatedAt: { type: Date },
});

PostSchema.pre('save', function (next) {
  const now = new Date();
  this.updatedAt = now;
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

module.exports = mongoose.model('Post', PostSchema);
