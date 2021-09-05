const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
    destination(req, file, cb) {
        if (file.fieldname === "img") {
            cb(null, 'images/products');
        } else if (file.fieldname === "newsImg") {
            cb(null, 'images/news');
        }
    },
    filename(req, file, cb) {
        cb(null, uuidv4() + path.parse(file.originalname).ext)
    }
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

module.exports = multer({
    storage,
    fileFilter
});