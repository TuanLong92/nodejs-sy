import { reject } from "bcrypt/promises";
import db from "../models/index";
let json2xls = require("json2xls");
const XLSX = require('xlsx');


let getTeacherHomeService = (limit) => {
    return new Promise(async (resolve, reject) => {//resolve: giai quyet. reject: tu choi
        try {
            let users = await db.User.findAll({
                limit: limit,
                // where: { roleId: "R2" },
                order: [["createdAt", "DESC"]],
                attributes: {
                    exclude: ["password"]
                },
                include: [
                    { model: db.Allcode, as: "positionData", attributes: ["valueEn", "valueVi"] },
                    { model: db.Allcode, as: "genderData", attributes: ["valueEn", "valueVi"] },
                ],
                raw: true,
                nest: true

            })
            resolve({
                errCode: 0,
                data: users
            })
        } catch (e) {
            reject(e);//lap tuc chay sang ham catch cua ben controller
        }
    })
}

let getAllTeachersService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let teachers = await db.User.findAll({
                // where: { roleId: "R2" },
                attributes: {
                    exclude: ["password", "image"]
                },
            })
            resolve({
                errCode: 0,
                data: teachers
            })
        } catch (e) {
            reject(e);
        }
    })
}

let saveInforTeacherService = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputData.teacherId || !inputData.contentHTML || !inputData.contentMarkdown
                || !inputData.action) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing parameter!"
                })
            } else {
                if (inputData.action === "CREATE") {
                    await db.Markdown.create({
                        contentHTML: inputData.contentHTML,
                        contentMarkdown: inputData.contentMarkdown,
                        description: inputData.description,
                        teacherId: inputData.teacherId
                    })
                } else if (inputData.action === "EDIT") {
                    let teaherMarkdown = await db.Markdown.findOne({
                        where: { teacherId: inputData.teacherId },
                        raw: false
                    })
                    if (teaherMarkdown) {
                        teaherMarkdown.contentHTML = inputData.contentHTML;
                        teaherMarkdown.contentMarkdown = inputData.contentMarkdown;
                        teaherMarkdown.description = inputData.description;
                        await teaherMarkdown.save();
                    }
                }

                resolve({
                    errCode: 0,
                    errMessage: "Save infor teacher success!"
                })
            }

        } catch (e) {
            reject(e);
        }
    })
}

let getDetailTeacherByIdService = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter!"
                })
            } else {
                let dataInfor = await db.User.findOne({
                    where: {
                        id: inputId
                    },
                    attributes: {
                        exclude: ["password"]
                    },
                    include: [
                        // { model: db.Markdown }//nếu lấy cả bảng markdown
                        {
                            model: db.Markdown,
                            attributes: ["description", "contentHTML", "contentMarkdown"]
                        },
                        { model: db.Allcode, as: "positionData", attributes: ["valueEn", "valueVi"] },
                    ],
                    raw: false,
                    nest: true
                })
                if (dataInfor && dataInfor.image) {
                    dataInfor.image = new Buffer(dataInfor.image, "base64").toString("binary")//user.image: blob, kieu ma hoa base64, convert sang binary
                }
                if (!dataInfor) {
                    dataInfor = {}
                }
                resolve({
                    errCode: 0,
                    data: dataInfor
                })
            }

        } catch (e) {
            reject(e);
        }
    })
}

let saveVideoService = (inputVideo) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.UploadVideo.create({
                name: inputVideo.name,
                description: inputVideo.description,
                video: inputVideo.video,
            })
            resolve('create succsess')// tra lai 1 string khi da luu thanh cong

        } catch (e) {
            reject(e);
        }
    })
}

let saveExcelFileTestService = (excelData) => {
    return new Promise(async (resolve, reject) => {
        try {

            for (const col of excelData) {
                await db.TestExcel.create({
                    lessonName: col[0], // Adjust the indexes based on your Excel data structure
                    questionImage: col[1],
                    question: col[2],
                    answer1: col[3],
                    answer2: col[4],
                    answer3: col[5],
                    answer4: col[6],
                    corectAnswer: col[7],
                    // Map each column from Excel to your model columns
                });
            }
            resolve('create succsess')// tra lai 1 string khi da luu thanh cong

        } catch (e) {
            reject(e);
        }
    })
}

let getExcelDataTestService = (idFile) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataFileTest = "";
            if (idFile === "ALL") {
                dataFileTest = await db.TestExcel.findAll();
            }
            if (idFile && idFile !== "ALL") {
                dataFileTest = await db.TestExcel.findOne({
                    where: { id: idFile },
                });
            }
            resolve(dataFileTest);
        } catch (e) {
            reject(e);
        }
    });
}

let getExcelDataTeacherService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let teachers = [];
            teachers = await db.User.findAll({
                attributes: {
                    exclude: ["password", "id", "createdAt", "updatedAt", "image", "roleId", "positionId"],
                },
            });
            let wb = XLSX.utils.book_new();
            let ws = XLSX.utils.json_to_sheet(teachers);
            //them workbook, ws worksheet và ten sheet
            XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
            //chuyen ve dang du lieu nhi phan
            let excelBuffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
            // let xls = json2xls(teachers);//chuyen data ve file excel

            resolve(excelBuffer);
        } catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    getTeacherHomeService: getTeacherHomeService,
    getAllTeachersService: getAllTeachersService,
    saveInforTeacherService: saveInforTeacherService,
    getDetailTeacherByIdService: getDetailTeacherByIdService,
    saveVideoService: saveVideoService,
    saveExcelFileTestService: saveExcelFileTestService,
    getExcelDataTestService: getExcelDataTestService,
    getExcelDataTeacherService: getExcelDataTeacherService
}