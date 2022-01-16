const ErrorHandler = require("../Utils/errorHandler");
const AsyncErrorHandler = require("../Middleware/catchAsyncError");
const BookASession = require("../Model/BookASession");
const mongoose = require("mongoose");

const booksessionCtrl = {
  //Get
  //api/booksession
  getAll: AsyncErrorHandler(async (req, res) => {
    const bookingInfo = await BookASession.find({}).sort({ createdAt: -1 });
    const totalCount = await BookASession.countDocuments();
    if (bookingInfo.length === 0) {
      res.status(200).json({ msg: "Empty booking list" });
    } else {
      res.status(200).json({ totalItems: totalCount, contactInfo });
    }
  }),
  //post
  //api/booksession
  create: AsyncErrorHandler(async (req, res, next) => {
    const { checkin, checkout, email, sessionType, guests } = req.body;
    if (!checkin && !checkout && !email && !sessionType)
      return next(new ErrorHandler("provide all the required fields", 404));

    const bookingInfo = new BookASession({
      checkin,
      checkout,
      email,
      sessionType,
      guests,
    });
    await bookingInfo
      .save()
      .then((data) =>
        res
          .status(201)
          .json({ data, message: "booking created successfully" })
      )
      .catch((err) => res.status(400).json({ message: "faild" }));
  }),
  //delete
  //api/booksession
  delete: AsyncErrorHandler(async (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return next(
        new ErrorHandler(`No booking found with id:${req.params.id}`, 404)
      );
    }
    await BookASession.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "deleted successfully" });
  }),
};
module.exports = booksessionCtrl;
