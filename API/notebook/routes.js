const express = require("express");
const {
  notebookFetch,
  notebookUpdate,
  notebookDelete,
  notebookCreate,
  noteCreate,
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

router.get("/", notebookFetch);

router.post("/", upload.single("image"), notebookCreate);

router.put("/:notebook", upload.single("image"), notebookUpdate);

router.post("/:notebookId/notes", upload.single("image"), noteCreate);

router.delete("/:notebook", notebookDelete);

module.exports = router;
