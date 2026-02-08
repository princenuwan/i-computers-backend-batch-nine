import e from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt";

export function createUser(req, res) {
  let hashedPassword = bcrypt.hashSync(req.body.password, 10);
  const user = new User({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: hashedPassword,
  });
  user
    .save()
    .then(() => {
      res.status(201).json({
        message: "User created successfully",
      });
    })
    .catch(() => {
      res.status(500).json({
        message: "Error creating user",
      });
    });
}

export function loginUser(req, res) {
  //login logic will be here
  console.log(req.body.email);

  User.findOne({
    email: req.body.email,
  }).then((user) => {
    if (user == null) {
      res.json({
        message: "user with given email not found",
      })
    } else {
      const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
      console.log(isPasswordValid);
    }
  });
}

git init
git add .
git commit -m "user login created"
git branch -M main
git remote add origin https://github.com/princenuwan/i-computers-backend-batch-nine.git
git push -u origin main