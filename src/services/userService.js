import { promise, reject } from "bcrypt/promises";
import db from "../models/index";
import bcrypt from "bcryptjs";
import { resolveInclude } from "ejs";
import user from "../models/user";
//import allcode from "../models/allcode";
import jwt from "jsonwebtoken";
require("dotenv").config();

const salt = bcrypt.genSaltSync(10);

let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};      
      let isExit = await checkUserEmail(email);
      if (isExit) {
        let usdata = await db.User.findOne({
          attributes: ["email", "password"], //chi lay nhung truong nay
          where: { email: email },
          raw: true, //tra ra object
        });
        if (usdata) {
          let check = await bcrypt.compareSync(password, usdata.password);
          if (check) {
            userData.errCode = 0;
            userData.errMessage = "Login successful";
             //creat jwt           
             let token = jwt.sign({ 
              data: usdata
            },
            process.env.JWT_SECRET,{
              expiresIn: "2 days"
            }
            ) 
            userData.usdata = token;           
             
                   
          } else {
            userData.errCode = 3;
            userData.errMessage = "wrong password";
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = "your'email is not exist 2";
        }
      } else {
        userData.errCode = 1;
        userData.errMessage = "your'email is not exist1";
      }
      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};
let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmail },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getAllUsers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (userId === "ALL") {
        users = await db.User.findAll({
          attributes: {
            exclude: ["password"],
          },
        });
      }
      if (userId && userId !== "ALL") {
        users = await db.User.findOne({
          where: { id: userId },
          attributes: {
            exclude: ["password"],
          },
        });
      }
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};
let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    console.log("data:", data)
    try {
      let checkEmail = await checkUserEmail(data.email);
      if (checkEmail === true) {
        resolve({
          errCode: 1,
          errMessage: "email exist?, try another email",
        });
      } else {
        let hashPasswordFromBcrypt = await hashUserPassword(data.password);
        await db.User.create({
          email: data.email,
          password: hashPasswordFromBcrypt,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          phonenumber: data.phonenumber,
          gender: data.gender,
          image: data.image,
          roleId: data.roleId,
          positionId: data.positionId,

        });
        resolve({
          errCode: 0,
          errMessage: "ok",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};
let deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    let user = await db.User.findOne({
      where: { id: userId },
    });
    if (!user) {
      resolve({
        errCode: 2,
        errMessage: "user is not exist",
      });
    }
    await db.User.destroy({
      where: { id: userId },
    });
    resolve({
      errCode: 0,
      errMessage: "user is deleted!",
    });
  });
};
let updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id || !data.roleId || !data.positionId || !data.gender) {
        resolve({
          errCode: 2,
          errMessage: "Missing required parapeter",
        });
      }
      let user = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (user) {
        user.firstName = data.firstName,
          user.lastName = data.lastName,
          user.address = data.address,
          user.roleId = data.roleId,
          user.positionId = data.positionId,
          user.gender = data.gender,
          user.phonenumber = data.phonenumber,
          user.image = data.image,
          user.image = data.image
        //   if (data.image) {
        //   user.image = data.image
        // }
        await user.save();
        resolve({
          errCode: 0,
          errMessage: "Updata success!",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "User not found!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};


let getAllCodeService = (typeInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = {};
      if (!typeInput) {
        resolve({
          errCode: 1,
          errMessage: "missing required parameter"
        })
      } else {
        let data = await db.Allcode.findAll({
          where: { type: typeInput }
        });
        res.errCode = 0;
        res.data = data;
        resolve(res)
      }
    }
    catch (e) {
      reject(e);
    }
  })
}


module.exports = {
  handleUserLogin: handleUserLogin,
  getAllUsers: getAllUsers,
  createNewUser: createNewUser,
  deleteUser: deleteUser,
  updateUserData: updateUserData,
  getAllCodeService: getAllCodeService
};
