const mongoose=require("mongoose");
const validator=require("validator");
const bcrypt=require("bcryptjs");
const JWT=require("jsonwebtoken");
const userSchema=new mongoose.Schema({
    fullname:{
        type:String,
        reuired:[true,"Please Enter your fullname"],
        maxLength:[30,"Name should not grater than 30 char"],
        minLength:[4,"Name should  grater than 4 char"],
    },
    email:{
        type:String,
        validate:[validator.isEmail,"Please enter a valid email"],unique:[true,"Email already used"],
        reqired:[true,"Please Enter your Email"],
    },
    password:{
         type:String,
         required:[true,"Please Enter password"],
         minLength:[8,"password should grater than equal to 8 char"],
         select:false
    },
    mobile:{
        type:String,
        required:[true,"Please Enter a mobile number"],
        minLength:[10,"Mobile no should not less than 10"],
        maxLength:[10,"Mobile no should not greater than 10"],
        unique:[true,"this mobile number is already used"]
    },
    craetedAt:{
        type:Date,
        default:Date.now
    }
})
// userSchema.index({ email: 1 }, { unique: true});

userSchema.pre("save",async function(){
    if(!this.isModified("password")){
        next()
    }
    this.password=await bcrypt.hash(this.password,10)
})

userSchema.methods.jswToken=()=>{
    return  JWT.sign({id:this._id},process.env.SECRET_KEY,{
        expiresIn:process.env.EXPIRE_TOKEN
    })
}

const userModel=mongoose.model("users",userSchema);
module.exports=userModel;