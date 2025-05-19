import { model } from "mongoose";
import UserSchema from "../schema/user.schema.js";

const UserModel = model("User", UserSchema);

export default UserModel;
