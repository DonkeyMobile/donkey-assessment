import type { NextFunction, Request, Response } from "express";
import User, { type IUser } from "../models/User.js";

export const createUser = async (
  req: Request<{}, {}, IUser>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { firstName, lastName, email }: IUser = req.body ?? {};

    if (!firstName || !lastName || !email) {
      return res.status(400).send("Missing fields");
    }

    const user = new User({ firstName, lastName, email });

    // Validating everything before checking for a duplicate email
    await user.validate();

    const emailInUse = await User.exists({ email: email });
    if (emailInUse) {
      return res.status(409).send("Email already in use");
    }

    await user.save();
    return res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId;

    const doesUserExist = await User.exists({ _id: userId });
    if (!doesUserExist) {
      return res.status(404).send("User was not found");
    }

    await User.deleteOne({ _id: userId });

    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};
