import e from "express";
import notes from "../models/notes.js";
import Note from "../models/notes.js";
import noteValidation from "../middlewares/noteValidation.js";
import { validationResult } from "express-validator";
const router = e.Router();

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}

router.get("/notes", isLoggedIn, (req, res) => {
  res.render("create-note", { errors: {}, data: {} });
});

router.post("/notes/create", isLoggedIn, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("create-note", {
        errors: errors.mapped(), // field-wise errors
        data: req.body, // pre-fill user input
      });
    }

    const { title, content } = req.body;
    const newNotes = await new notes({
      title: title,
      content: content,
      user: req.user._id,
    });
    let result = await newNotes.save();
    console.log(result);
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
});

router.delete("/notes/:id/delete", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await Note.findByIdAndDelete(id);
    if (!deleteUser) {
      res.send("user not found");
    }
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
});

router.get("/edit", isLoggedIn, (req, res) => {
  res.render("edit-note");
});

router.get("/notes/:id/edit", async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findOne({ _id: id, user: req.user.id });
    if (!note) {
      return res.send("note not found");
    }
    res.render("edit-note", { note });
  } catch (error) {
    res.status(500).send("something went wrong");
  }
});

router.put("/notes/:id/edit", async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.params;
  const updatedNotes = await Note.findByIdAndUpdate(
    id,
    {
      title,
      content,
    },
    { new: true }
  );
  if (!updatedNotes) {
    res.send("notes not found");
  }
  console.log(updatedNotes);
  res.redirect("/dashboard");
});

export default router;
