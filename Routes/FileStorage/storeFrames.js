var multer = require('multer');

var storageSV = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'frameImages/SV')
	},
	// filename: (req, file, cb) => {
	// 	cb(null, file.fieldname + '-' + Date.now())
	// }
});
exports.uploadframeSV = multer({ storage: storageSV });

var storageFV = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'frameImages/FV')
	},
	// filename: (req, file, cb) => {
	// 	cb(null, file.fieldname + '-' + Date.now())
	// }
});
exports.uploadframeFV = multer({ storage: storageFV });

var storageAV = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'frameImages/AV')
	},
	// filename: (req, file, cb) => {
	// 	cb(null, file.fieldname + '-' + Date.now())
	// }
});
exports.uploadframeAV = multer({ storage: storageAV });

var storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'frameImages')
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname + '-' + Date.now())
	}
});
exports.uploadframe = multer({ storage: storage });