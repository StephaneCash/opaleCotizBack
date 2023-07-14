const path = require('path')
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const uploadVideo = multer({
    storage: storage,
    limits: { fileSize: '10000000000' },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif|JPG|PNG|JPEG|GIF|mp4|avi|MP4|MP3|AVI|MP4|MKV|mkv/
        const mimeType = fileTypes.test(file.mimetype)
        const extname = fileTypes.test(path.extname(file.originalname))

        if (mimeType && extname) {
            return cb(null, true)
        }
        return cb("Veuillez fournir un bon format de fichiers à télécharger");
    }
}).single('video');

module.exports = uploadVideo