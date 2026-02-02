const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

const uploadToCloudinary = (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: 'macaalinka/products',
                resource_type: 'auto'
            },
            (error, result) => {
                if (result) {
                    resolve(result.secure_url);
                } else {
                    reject(error);
                }
            }
        );

        streamifier.createReadStream(fileBuffer).pipe(stream);
    });
};

module.exports = uploadToCloudinary;
