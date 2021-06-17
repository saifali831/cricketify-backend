const multer = require("multer");
const cloudinary = require("cloudinary");
const {CloudinaryStorage} = require("multer-storage-cloudinary");

cloudinary.config({
    cloud_name: "cricketify",
    api_key: "",
    api_secret: ""
    });
    const storage = new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
          folder: 'uploads',
          allowedFormats: ["jpg", "png"],
          transformation: [{ width: 500, height: 500, crop: "limit" }]
        },
      });
    const parser = multer({ storage: storage });

    module.exports = parser;