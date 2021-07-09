const { Note } = require('../../db/models');

exports.fetchNote = async (noteId, next) => {
  try {
    const note = await Note.findByPk(noteId);
    return note;
  } catch (error) {
    next(error);
  }
};

exports.noteFetch = async (req, res, next) => {
  try {
    const notes = await Note.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
    res.json(notes);
  } catch (error) {
    next(error);
  }
};

exports.noteUpdate = async (req, res, next) => {
  try {
    if (req.file) req.body.image = `http://${req.get('host')}/${req.file.path}`;
    const updatedNote = await req.note.update(req.body);
    res.json(updatedNote);
  } catch (error) {
    next(error);
  }
};

exports.noteDelete = async (req, res, next) => {
  try {
    await req.note.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
