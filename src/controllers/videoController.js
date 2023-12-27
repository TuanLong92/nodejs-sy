import videoService from "../services/videoService";




let saveVideo = async (req, res) => {
    try {
        let infor = await videoService.saveVideoService(req.body);
        return res.status(200).json(infor);
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

let saveExcelFileTest = async (req, res) => {
    try {
        let infor = await videoService.saveExcelFileTestService(req.body);
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        })
    }
}

let getExcelDataTest = async (req, res) => {
    try {
        let id = req.query.id; //all hoac id
        if (!id) {
            return res.status(200).json({
                errCode: 1,
                errMessage: "Missing required parameters",
                excelDataTest: [],
            });
        }
        let excelDataTest = await videoService.getExcelDataTestService(id);
        console.log(excelDataTest);
        return res.status(200).json({
            excelDataTest,
            errCode: 0,
            errMessage: "ok",
        });
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        })
    }

}

let getExcelDataTeacher = async (req, res) => {
    try {
        let response = await videoService.getExcelDataTeacherService();
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename="danhsachteacher.xlsx"');
        res.send(response);//gui lai data buffer
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        })
    }
}
module.exports = {
    saveVideo: saveVideo,
    getDetailTeacherById: getDetailTeacherById,
    saveExcelFileTest: saveExcelFileTest,
    getExcelDataTest: getExcelDataTest,
    getExcelDataTeacher: getExcelDataTeacher
}