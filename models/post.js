const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Populate = require('../util/autopopulate');

const PostSchema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  summary: { type: String, required: true },
  subreddit: { type: String, required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  upVotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  downVotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  voteScore: { type: Number },
  createdAt: { type: Date },
  updatedAt: { type: Date },
});

// Always populate the author field
PostSchema.pre('findOne', Populate('author')).pre('find', Populate('author'));
PostSchema.pre('save', (next) => {
  const now = new Date();
  this.updatedAt = now;
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

module.exports = mongoose.model('Post', PostSchema);
