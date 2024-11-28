// Multer middleware : a node.js middleware for handling multipart/form-data, which is primarily used for uploading files.
// NOTE! : it can only process multipart/form-data
// Need to install multer in backend => npm i multer

//import multer
const multer = require ('multer')

const storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'./uploads')
    },
    filename:(req,file,callback)=>{
        const filename = `image-${Date.now()}-${file.originalname}`
        callback(null,filename)
    }
})

const fileFilter = (req,file,callback)=>{
    if(file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        callback(null,true)
    }else{
        callback(null,false)
        return callback(new Error("Only png, jpg or jpeg files are supported!"))
    }
}
// mimetype is used to set the type of file

const multerConfig = multer({
    storage, //where the file is stored
    fileFilter //types of files can be stored
}).single("profileimg")

//export
module.exports = multerConfig

//NOTE! : import multerConfig in router.js