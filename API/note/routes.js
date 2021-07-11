const express = require("express");
const {
  noteFetch,
  fetchNote,
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

// param middleware
router.param("noteId", async (req, res, next, noteId) => {
  const note = await fetchNote(noteId, next);
  if (note) {
    req.note = note;
    next();
  } else {
    const error = new Error("note Not Found!");
    error.status(404);
    next(error);
  }
});

router.get("/", noteFetch);

router.put("/:noteId", upload.single("image"), noteUpdate);

router.delete("/:noteId", noteDelete);

module.exports = router;
