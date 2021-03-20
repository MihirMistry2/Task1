const router = require('express').Router();
const multer = require('multer');

const controller = require('../controller/controller');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/image/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg' ||
        (file.mimetype === 'image/png' && !req.file)
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

let upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 },
    fileFilter: fileFilter,
});

router.get('/', controller.getData);
router.get('/:id', controller.getDataById);
router.post('/', upload.single('logo'), controller.createData);
router.patch('/:id', upload.single('logo'), controller.updateData);
router.delete('/:id', controller.deleteData);

module.exports = router;
