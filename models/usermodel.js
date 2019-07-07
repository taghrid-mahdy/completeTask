const mongoose = require('mongoose');
const emailValidator = require('email-validator');
const joi = require('joi');

const accepted_extensions = ['jpg', 'png'];
function validateAvatar(link){
    const upload = multer({
        limits: { 
            fileSize: 3 * 1024 ,  // 5 MB upload limit
            files: 1                    // 1 file
        },
        fileFilter: (req, file, cb) => {
            // if the file extension is in our accepted list
            if (accepted_extensions.some(ext => file.originalname.endsWith("." + ext))) {
                return cb(null, true);
            }
    
            // otherwise, return error
            return cb(new Error('only 1 file whose file extension jpg or png is required'));
        }
    });
     //upload.single(link);


};

var userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    email: {
        type: String,
        validate : {
            isAsync : true ,
            validator : function(email,callback) {
                const result = emailValidator.validate(email);
                callback(result);
            },
            message : 'please enter a valid email'
        } 
    },
    password: {
        type: String,
        min: 6 ,
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    Avatar : {
        type : String,
        validate : validateAvatar
    }
});

function validateuser (user){
    const schema = {
        username : joi.string().min(5).max(50).required(),
        email : joi.string().min(5).max(255).email(),
        password : joi.string().min(5).max(255).required(),
        firstname : joi.string().min(5).max(100),
        lastname : joi.string().min(5).max(100)
    };
    return joi.validate(user,schema);
}

const User = mongoose.model('User',userSchema);

exports.User = User;
exports.validate = validateuser;
