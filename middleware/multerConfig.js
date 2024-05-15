const multer  = require('multer');
const path = require('path');



const filePath = `./public/uploads`

const storage =  multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, filePath);
    },
    filename: function (req, file, cb) {
        const fileExtension = path.extname(file.originalname);
        const fileName = file.fieldname+Date.now()+fileExtension
        cb(null, fileName);
    },
})

const upload = multer({ storage:storage });




module.exports = {upload}