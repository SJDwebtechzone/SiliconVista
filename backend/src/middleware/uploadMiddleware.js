import multer from 'multer';
import path from 'path';

// Storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let dest = 'uploads/';
    // Depending on the fieldname or URL, route to banner or testimonial folder
    if (file.fieldname === 'bannerImage') {
      dest = 'uploads/banner/';
    } else if (file.fieldname === 'testimonialImage') {
      dest = 'uploads/testimonial/';
    } else if (file.fieldname === 'photo') {
      dest = 'uploads/reviews/';
    } else if (file.fieldname === 'popupImage') {
      dest = 'uploads/popup/';
    } else if (file.fieldname === 'brochureFile') {
      dest = 'uploads/brochure/';
    } else if (file.fieldname === 'partnerLogo') {
      dest = 'uploads/partners/';
    } else if (file.fieldname === 'blogImage') {
      dest = 'uploads/blogs/';
    }
    cb(null, dest);
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

// File validation
const fileFilter = (req, file, cb) => {
  if (file.fieldname === 'brochureFile') {
    // For brochures, allow PDF, Word Docs, and Images
    if (file.mimetype.startsWith('image') || 
        file.mimetype === 'application/pdf' || 
        file.mimetype === 'application/msword' || 
        file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      cb(null, true);
    } else {
      cb(new Error('For brochures, please upload only PDF, Word Doc, or Image.'), false);
    }
  } else {
    // For other fields, strict image only
    if (file.mimetype.startsWith('image')) {
      cb(null, true);
    } else {
      cb(new Error('Please upload only images.'), false);
    }
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  }
});

export default upload;
