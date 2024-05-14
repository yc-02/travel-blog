const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {isEmail} = require('validator');
const bcrypt = require('bcryptjs');


const userSchema = new Schema({
    email:{
        type: String,
        required: [true, 'Email is required.'],
        unique: true,
        lowercase: true,
        validate:[isEmail, 'Please enter a valid email.']
    },
    password:{
        type: String,
        required: [true, 'Password is required.'],
        minlength:[6, 'Minimum password length is 6 characters.']
    },
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    }

},{timestamps: true});


userSchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    next();
})

userSchema.statics.login = async function(email,password){
    const user = await this.findOne({email});
    if(user){
       const auth = await bcrypt.compare(password,user.password)
       if(auth){
        return user
       }
       throw Error('Password incorrect.')
    }
    throw Error('Email Address is not Registered.')

}

const User = mongoose.model('user',userSchema);

module.exports = User;