const multer  = require('multer');
const fs = require('fs');
const path = require('path');



const filePath = `./public/uploads`

const storage =  multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, filePath);
    },
    filename: function (req, file, cb) {
        const fileName = file.fieldname+Date.now()
        cb(null, fileName);
    },
})

const upload = multer({ storage:storage });

const clearUploadsFolder = ()=>{
    fs.readdir(`${filePath}`,(err,files)=>{
        if(err){
            console.log(err)
        }
        console.log(files)
        files.forEach(file=>{
            const eachPath = path.join(filePath,file)
            fs.unlink(eachPath,(err)=>{
                if(err){
                    console.log(err)
                }else{
                    console.log('deleted')
                }
            })
        })
    })
}



module.exports = {upload,clearUploadsFolder}