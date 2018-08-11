"use strict";

const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  created: { type: Date, default: Date.now },
  author: { 
    firstName: String, 
    lastName: String },
});

/*blogSchema.methods.authorName = function() {
  return this.author.firstName + " " + this.author.lastName;
};*/


blogSchema.virtual('authorName').get(function() {
  return `${this.author.firstName} ${this.author.lastName}`.trim();
});

blogSchema.methods.serialize = function() {
  return {
    id: this._id,
    title: this.title,
    content: this.content,
    created: this.created,
    author: this.authorName
  };
};

const Blog = mongoose.model("Blog", blogSchema);
module.exports = { Blog };