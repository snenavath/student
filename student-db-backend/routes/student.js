const express = require("express");
const router = express.Router();
const Student = require("../models/student");

router.post("/create", (req, res) => {
  const newItem = new Student({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    dob: req.body.dob,
  });

  newItem
    .save()
    .then((data) => res.status(201).json({ message: "Student Added", data }))
    .catch((err) => res.status(400).json("Error" + err));
});

router.get("/list", (req, res) => {
  Student.find()
    .then((students) => res.json(students))
    .catch((err) => res.status(400).json("Error" + err));
});

router.delete("/delete/:id", (req, res) => {
  Student.findByIdAndDelete(req.params.id)
    .then((data) => res.status(200).json({ message: "Student Deleted", data }))
    .catch((err) => res.status(400).json("Error" + err));
});

router.post("/update/:id", (req, res) => {
  Student.findById(req.params.id)
    .then((student) => {
      (student.firstName = req.body.firstName),
        (student.lastName = req.body.lastName),
        (student.dob = req.body.dob),
        student
          .save()
          .then((data) =>
            res.status(200).json({ message: "Student Updated", data })
          )
          .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
