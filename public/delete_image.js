const fs = require('fs');
const path = require('path');

const deleteUploadsImage = (images)=>{
 
    images.forEach(image => {
        const eachPath = path.join(__dirname, image.image_path)
        fs.unlink(eachPath,(err)=>{
            if(err){
                console.log(err)
            }else{
                console.log('delted')
            }
        })
        
    });
    console.log(images)
}
module.exports = {deleteUploadsImage}