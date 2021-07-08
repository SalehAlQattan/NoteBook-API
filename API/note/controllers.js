const { Note } = require("../../db/models");

exports.noteFetch = async (req, res, next) => {
  try {
    const notes = await Note.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(notes);
  } catch (error) {
    next(error);
  }
};

// For later...
exports.noteUpdate = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

exports.noteDelete = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
