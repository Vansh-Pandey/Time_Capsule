import mongoose from "mongoose"

export const connectDB=async()=>{
try{
    const conn=await mongoose.connect(process.env.ATLAS_URI)
    console.log("MongoDB connected ")
}
catch(error){
    console.log("MongoDB not connected",error)
}

}