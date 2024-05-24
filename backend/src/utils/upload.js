const multer = require('multer');

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         return cb(null, './uploads');
//     },
//     filename: function (req, file, cb) {
//         const ext = file.originalname.split('.').pop(); // Get the file extension
//         return cb(null, `${file.originalname.replace(/\s/g, '').slice(0, -4)}-${Date.now()}.${ext}`);
//     },
// });

// const upload = multer({ storage });

const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: function (req, file, cb) {
        return cb(null, true);
    },
    limits: {
        fileSize: 1000000,
    },
});

module.exports = { upload };