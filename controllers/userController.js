import e from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

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
  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (user == null) {
        res.json({
          message: "user with given email not found",
        });
      } else {
        const isPasswordValid = bcrypt.compareSync(
          req.body.password,
          user.password,
        );

        if (isPasswordValid) {
          const token = Jwt.sign(
            {
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
              role: user.role,
              image: user.image,
              isEmailVerified: user.isEmailVerified,
            },
            "i-computers-54",
          );

          console.log(token);

          console.log({
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            image: user.image,
            isEmailVerified: user.isEmailVerified,
          });

          res.json({
            message: "Login successfull",
          });
        } else {
          res.status(401).json({
            message: "Login failed",
          });
        }
      }
    })
    .catch(() => {
      res.status(500).json({
        message: "Internal Server error",
      });
    });
}
