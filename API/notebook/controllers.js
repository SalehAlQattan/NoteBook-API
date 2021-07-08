const { Notebook, Note } = require("../../db/models");

exports.notebookFetch = async (req, res, next) => {
  try {
    const notebooks = await Notebook.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: Note,
        as: "notes",
        attributs: ["id"],
      },
    });
    res.json(notebooks);
  } catch (error) {
    next(error);
  }
};

exports.notebookCreate = async (req, res, next) => {
  try {
    if (req.file) req.body.image = `http://${req.get("host")}/${req.file.path}`;

    const newNotebook = await Notebook.create(req.body);
    res.status(201).json(newNotebook);
  } catch (error) {
    next(error);
  }
};

exports.noteCreate = async (req, res, next) => {
  try {
    if (req.file) req.body.image = `http://${req.get("host")}/${req.file.path}`;
    req.body.notebookId = req.notebook.id;

    const newNote = await Note.create(req.body);
    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};

// For later...
exports.notebookUpdate = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

exports.notebookDelete = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};