const mongoose=require("mongoose");

async function connectdb(){
 await mongoose.connect(process.env.DATABASE,{
    useUnifiedTopology: true,
    useNewUrlParser: true,
    autoIndex: true,
 }).then((data)=>{
    console.log(`Database connected on host ${data.connection.host}`)
})
}

module.exports=connectdb;