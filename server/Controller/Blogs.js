const ErrorHandler = require("../Utils/errorHandler");
const AsyncErrorHandler = require("../Middleware/catchAsyncError");
const Blog = require("../Model/Blogs");
const multer = require("multer");
const mongoose = require("mongoose");
const APIfeatures = require("../Utils/Queries");
const fileCtrl = require("../Utils/Multer");

const blogCtrl = {
  //Get
  //api/blogs
  getAll: AsyncErrorHandler(async (req, res, next) => {
    const apiFeature = new APIfeatures(Blog.find(), req.query)
      .search()
      .sorting()
      .filtering()
      .paginating(15);
    const totalCount = await Blog.countDocuments();
    const blogs = await apiFeature.query;
    if (blogs.length === 0) {
      res.status(200).json({ msg: "Empty blogs list" });
    } else {
      res.status(200).json({ totalItems: totalCount, blogs });
    }
  }),
  //post
  //api/blogs
  create: AsyncErrorHandler(async (req, res, next) => {
    const { title, video, images, description } = req.body;
    fileCtrl.blogFiles_upload(req, res, async function (err) {
      //multer error
      if (err instanceof multer.MulterError) {
        res
          .status(500)
          .send({
            error: { msg: `multer uploading error: ${err.message}` },
          })
          .end();
        return;
      } else if (err) {
        //unknown error
        if (err.name == "ExtensionError") {
          res
            .status(413)
            .send({ error: { msg: `${err.message}` } })
            .end();
        } else {
          res
            .status(500)
            .send({ error: { msg: `unknown uploading error: ${err.message}` } })
            .end();
        }
        return;
      }
      if (title && images && description) {
        const blog = new Blog({
          title,
          images:req.files,
          video,
          description,
        });
        console.log(blog);
        await blog
          .save()
          .then((data) =>
            res.status(201).json({ data, message: "blog created successfully" })
          )
          .catch((err) => res.status(400).json({ message: err }));
      } else {
        return next(new ErrorHandler("please fill all fields!", 500));
      }
    });
  }),
  //delete
  //api/blogs
  delete: AsyncErrorHandler(async (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return next(
        new ErrorHandler(`No blog found with id:${req.params.id}`, 404)
      );
    }
    await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "deleted successfully" });
  }),
  //get
  //api/blogs
  recentBlogs: AsyncErrorHandler(async (req, res, next) => {
    const blogs = await (
      await Blog.find({}).sort({ createdAt: -1 })
    ).splice(0, 5);
    const totalCount = await Blog.countDocuments();
    if (!blogs) {
      res.status(404).json({ message: "empty blogs" });
    } else {
      res.status(200).json({ totalItems: totalCount, blogs });
    }
  }),
};
module.exports = blogCtrl;
