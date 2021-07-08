const express = require("express");
const {
  noteFetch,
  noteCreate,
  noteUpdate,
  noteDelete,
} = require("./controllers");
const multer = require("multer");

const router = express.Router();

// Multer
const storage = multer.diskStorage({
  destination: "./media",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

router.get("/", noteFetch);

router.put("/:notebook", upload.single("image"), noteUpdate);

router.delete("/:notebook", noteDelete);

module.exports = router;
