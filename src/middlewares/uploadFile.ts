import { NextFunction, Request, Response } from "express";
import multer from "multer";

interface MulterRequest extends Request {
  fileValidationError: any;
}

export const uploadFile = (imageFile:string) => {
  //path
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname.replace(/\s/g, ""));
    },
  });

  //filter format file image
  const fileFilter = function (req:MulterRequest, file:Express.Multer.File, cb:any) {
    if (file.fieldname === imageFile) {
      if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = {
          message: "Only image files are allowed",
        };
        return cb(new Error("Only image files are allowed"), false);
      }
    }

    cb(null, true);
  };

  const sizeMb = 10;
  const maxSize = sizeMb * 1000 * 1000;

  const upload = multer({
    storage,
    fileFilter,
    limits: {
      fileSize:maxSize,
    },
  }).single(imageFile);

  return (req:MulterRequest, res:Response, next:NextFunction) => {
    upload(req, res, (err) => {
      if (req.fileValidationError)
        return res.status(400).send(req.fileValidationError);

      if (!req.file && !err)
        return res.status(400).send({
          message: "Please select file  to upload",
        });

      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).send({
            message: "Max file size 10Mb",
          });
        }
        return res.status(400).send(err);
      }
      console.log(err);
      return next();
    });
  };
};
