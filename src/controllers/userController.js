import userService from "../services/userService";

let handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  if (!email || !password) {
    return res.status(500).json({
      erroCode: 1,
      message: "missing input parameter!",
    });
  }
  let userData = await userService.handleUserLogin(email, password);

  return res.status(200).json({
    errCode: userData.errCode,
    errMessage: userData.errMessage,
    token: userData.usdata ? userData.usdata : null,
    // email: "email",
  });
};
let handleGetAllUsers = async (req, res) => {
  let id = req.query.id; //all hoac id
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters",
      users: [],
    });
  }
  let users = await userService.getAllUsers(id);
  console.log(users);
  return res.status(200).json({
    errCode: 0,
    errMessage: "ok",
    users,
  });
};
// let handleCreateNewUser = async (req, res) => {
//   let message = await userService.createNewUser(req.body);
//   console.log(message);
//   return res.status(200).json(message);
// };
let handleCreateNewUser = async (req, res) => {
  try {
    let message = await userService.createNewUser(req.body);
    return res.status(200).json(message)

  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server"
    })
  }
}
let handleEditUser = async (req, res) => {
  let data = req.body;
  let message = await userService.updateUserData(data);
  return res.status(200).json(message);
};
let handleDeleteUser = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameter!",
    });
  }
  let message = await userService.deleteUser(req.body.id);
  return res.status(200).json(message);
};

let getAllCode = async (req, res) => {
  try {
    let data = await userService.getAllCodeService(req.query.type);
    console.log(data);
    return res.status(200).json(data)
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "err from server"
    })
  }
}

module.exports = {
  handleLogin: handleLogin,
  handleGetAllUsers: handleGetAllUsers,
  handleCreateNewUser: handleCreateNewUser,
  handleEditUser: handleEditUser,
  handleDeleteUser: handleDeleteUser,
  getAllCode: getAllCode,
  // postInforTeacher: postInforTeacher
};
