const express=require("express");
const { createUser } = require("../controllers/userController");
const router=express.Router();

router.route("/register").post(createUser);
router.route("/").get(async(req,res)=>{
    res.send("hello")
})
module.exports=router;