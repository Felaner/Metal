const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'images/products')
    },
    filename(req, file, cb) {
        cb(null, uuidv4() + path.parse(file.originalname).ext)
    }
});

const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg']

const fileFilter = (req, file, cb) => {
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(null, false)
    }
};

module.exports = multer({
    storage,
    fileFilter
})