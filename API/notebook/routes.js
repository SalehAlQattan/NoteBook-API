const express = require('express');
const {
  notebookFetch,
  fetchNotebook,
  notebookUpdate,
  notebookDelete,
  notebookCreate,
  noteCreate,
} = require('./controllers');

const multer = require('multer');

const router = express.Router();

// Multer
const storage = multer.diskStorage({
  destination: './media',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// param middleware
router.param('notebookId', async (req, res, next, notebookId) => {
  const notebook = await fetchNotebook(notebookId, next);
  if (notebook) {
    req.notebook = notebook;
    next();
  } else {
    const error = new Error('Notebook Not Found!');
    error.status(404);
    next(error);
  }
});

router.get('/', notebookFetch);

router.post('/', upload.single('image'), notebookCreate);

router.put('/:notebookId', upload.single('image'), notebookUpdate);

router.post('/:notebookId/notes', upload.single('image'), noteCreate);

router.delete('/:notebookId', notebookDelete);

module.exports = router;
