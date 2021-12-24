const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
	destination: path.join(__dirname, '../public/storage'),
	filename: (req, file, callback) => {
		callback(null, `${file.filename}-${file.originalname}`);
	}
});

const uploadSingle = multer({
	storage,
	dest: path.join(__dirname, '../public/storage'),
}).single('image');

module.exports = {uploadSingle};
