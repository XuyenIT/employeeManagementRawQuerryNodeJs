const multer = require("multer");
const handleUpload = () => {
  //upload file
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./app/public/upload"); //set duong dan luu file
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });
  const upload = multer({ storage: storage });
  return upload.single("image");
};
module.exports = handleUpload;
