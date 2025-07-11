import bcrypt from "bcrypt";
import config from "../config/index.js";

const hashPassword = async (newPassword) => {

  return await bcrypt.hash(newPassword, Number(config.bcrypt_salt_rounds));

};

export default hashPassword;