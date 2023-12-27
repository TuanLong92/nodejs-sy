import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import teacherController from "../controllers/teacherController"
import videoController from "../controllers/videoController"
let router = express.Router();
let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/cart", homeController.getCartPage);
  router.get("/crud", homeController.getCRUD);
  router.post("/post-crud", homeController.postCRUD);
  router.get("/get-crud", homeController.displayGetCRUD);
  router.get("/edit-crud", homeController.getEditCRUD);
  router.post("/put-crud", homeController.putCRUD);
  router.get("/delete-crud", homeController.deleteCRUD);

  router.post("/api/login", userController.handleLogin);
  router.get("/api/get-all-user", userController.handleGetAllUsers);
  router.post("/api/create-new-user", userController.handleCreateNewUser);
  router.put("/api/edit-user", userController.handleEditUser);
  router.delete("/api/delete-user", userController.handleDeleteUser);
  router.get("/api/AllCode", userController.getAllCode);


  router.get("/api/get-teacher-home", teacherController.getTeacherHome);
  router.get("/api/get-all-teachers", teacherController.getAllTeachers);
  router.post("/api/save-infor-teachers", teacherController.postInforTeacher);
  router.get("/api/get-detail-teacher-by-id", teacherController.getDetailTeacherById);

  router.post("/api/save-excel-file-test", videoController.saveExcelFileTest);
  router.get("/api/get-excel-data-test", videoController.getExcelDataTest);
  router.get("/api/get-excel-data-teacher", videoController.getExcelDataTeacher);


  return app.use("/", router);
};
module.exports = initWebRoutes;
