import db from '../models/index.js';

const index = (req, res) => {
  db.Note.find({user: req.currentUser.id}, (err, foundNotes) => {
    if (err) console.log('Error in notes#index:', err);
    console.log(req.currentUser, foundNotes)
    res.status(200).json(foundNotes);
  });
};

const show = (req, res) => {
  db.Note.findById(req.params.id, (err, foundNote) => {
    if (err) console.log('Error in notes#show:', err);
    res.status(200).send(foundNote);
  });
};

const create = (req, res) => {
  console.log(req.currentUser)
  req.body.user = [req.currentUser.id]
  db.Note.create(req.body, (err, savedNotes) => {
    if (err) console.log('Error in notes#create:', err);

    res.status(200).json(savedNotes);
  });
};

const update = (req, res) => {
  db.Note.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedNote) => {
    if (err) console.log('Error in notes#update:', err);

    if (!updatedNote) {
      res.status(400).json({message: `Could not find Note with id ${req.params.id}`});
    }

    res.json("updatedNote");
  });
};

const destroy = (req, res) => {
  db.Note.findByIdAndDelete(req.params.id, (err, deletedNote) => {
    if (err) console.log('Error in Notes#destroy:', err);

    res.status(200).json(deletedNote);
  });
};

const controls = {
  index,
  show,
  create,
  update,
  destroy,
};

export default controls;