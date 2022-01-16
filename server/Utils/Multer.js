const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const fileCtrl = {
  blogFiles_upload: multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../../client/public/blogImages"));
      },
      filename: function (req, file, cb) {
        cb(
          null,
          file.fieldname +
            "-" +
            Date.now() +
            file.originalname.match(/\..*$/)[0]
        );
      },
    }),
    limits: {fileSize: 100000000},
    fileFilter: (req, file, cb) => {
      if (
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpeg" ||
        file.mimetype == "image/jpg"
      ) {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new Error("Only .jpg .jpeg .png images are supported!"));
      }
    },
  }).array("blogImages", 5),

  careerPortalFiles_upload: multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../../client/public/careerPortalPdf"));
      },
      // filename: function (req, file, cb) {
      //   cb(
      //     null,
      //     file.fieldname +
      //       "-" +
      //       Date.now() +
      //       file.originalname.match(/\..*$/)[0]
      //   );
      // },
      filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(" ").join("-");
        cb(null, uuidv4() + "-" + fileName);
      },
    }),
    limits: {fileSize: 100000000},
    //https://www.ibm.com/docs/en/wkc/cloud?topic=catalog-previews
    fileFilter: (req, file, cb) => {
      if (
        file.mimetype == "application/msword"||
        file.mimetype == "application/vnd.ms-word.document.macroEnabled.12"||
        file.mimetype == "application/vnd.ms-word.template.macroEnabled.12" ||
        file.mimetype == "application/vnd.openxmlformats-officedocument.wordprocessingml.document"||
        file.mimetype == " 	application/vnd.openxmlformats-officedocument.wordprocessingml.template" ||
        file.mimetype == "application/pdf"
        // file.mimetype == " 	application/vnd.openxmlformats-officedocument.presentationml.presentation" ||
        // file.mimetype == "application/vnd.ms-powerpoint.presentation.macroEnabled.12" ||
        // file.mimetype == "application/vnd.ms-powerpoint" ||
        // file.mimetype == "application/vnd.ms-powerpoint.slideshow.macroEnabled.12"
      ) {
        cb(null, true);
      } else {
        cb(null, false);
        const err = new Error("Only .pdf, .doc .docx files are supported!");
        err.name = "ExtensionError";
        return cb(err);
      }
    },
  }).single("careerPortalPdf"),
};

module.exports = fileCtrl;
