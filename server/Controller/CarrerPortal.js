const ErrorHandler = require("../Utils/errorHandler");
const AsyncErrorHandler = require("../Middleware/catchAsyncError");
const CarrerPortal = require("../Model/CarrerPortal");
const multer = require("multer");
const mongoose = require("mongoose");
const APIfeatures = require("../Utils/Queries");
const fileCtrl = require("../Utils/Multer")

const carrerPortalCtrl = {
  //Get
  //api/carrer
  getAll: AsyncErrorHandler(async (req, res, next) => {
    const apiFeature = new APIfeatures(CarrerPortal.find(), req.query)
      .search()
      .sorting()
      .filtering()
      .paginating(15);
    const totalCount = await CarrerPortal.countDocuments();
    const portals = await apiFeature.query;
    if (portals.length === 0) {
      res.status(200).json({ msg: "Empty portals list" });
    } else {
      res.status(200).json({ totalItems: totalCount, portals });
    }
  }),
  //post
  //api/carrer
  create: AsyncErrorHandler(async (req, res, next) => {
    const url = req.protocol + '://' + req.get('host')
    console.log('url',url);
    fileCtrl.careerPortalFiles_upload(req, res, async function (err) {
      // console.log(url + '/public/careerPortalPdf' + req.file);
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
        const portal = new CarrerPortal({
            filename:url + '/public/careerPortalPdf/' + req.file.filename,
        });
        // console.log(portal);
        await portal
          .save()
          .then((data) =>
            res.status(201).json({ data, message: "portal created successfully" })
          )
          .catch((err) => res.status(400).json({ message: err }));
    });
  }),
  //delete
  //api/carrer
  delete: AsyncErrorHandler(async (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return next(
        new ErrorHandler(`No portals found with id:${req.params.id}`, 404)
      );
    }
    await CarrerPortal.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "deleted successfully" });
  }),
  //get
  //api/carrer
  recentPortals: AsyncErrorHandler(async (req, res, next) => {
    const portals = await (
      await CarrerPortal.find({}).sort({ createdAt: -1 })
    ).splice(0, 5);
    const totalCount = await CarrerPortal.countDocuments();
    if (!portals) {
      res.status(404).json({ message: "empty portals" });
    } else {
      res.status(200).json({ totalItems: totalCount, portals });
    }
  }),
};
module.exports = carrerPortalCtrl;
