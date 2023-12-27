import teacherService from "../services/teacherService";

let getTeacherHome = async (req, res) => {
    let limit = req.query.limit;//so luong giao vien yeu cau hien thi len man hinh
    if (!limit) {
        limit = 10;
    }
    try {
        let response = await teacherService.getTeacherHomeService(+limit);//dau + converst tu kieu string sang number
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error get teacher from server"
        })
    }
}

let getAllTeachers = async (req, res) => {
    try {
        let Teachers = await teacherService.getAllTeachersService();
        return res.status(200).json(Teachers)

    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        })
    }
}

let postInforTeacher = async (req, res) => {
    try {
        let response = await teacherService.saveInforTeacherService(req.body);
        return res.status(200).json(response)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        })
    }
}

let getDetailTeacherById = async (req, res) => {
    try {
        let infor = await teacherService.getDetailTeacherByIdService(req.query.id);
        return res.status(200).json(infor);

    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        })
    }
}

module.exports = {
    getTeacherHome: getTeacherHome,
    getAllTeachers: getAllTeachers,
    postInforTeacher: postInforTeacher,
    getDetailTeacherById: getDetailTeacherById
}