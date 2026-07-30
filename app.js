const express=require("express");

const app=express();
const mongoose=require("mongoose");
const port=8080;
const path=require("path");
const Listing=require("./models/listing.js");
const ejsMate=require("ejs-mate");
const ExpressError=require("./init/utils/ExpressError.js");
app.engine("ejs",ejsMate);
const Review =require("./models/review.js");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));
const methodoverride=require("method-override");
app.use(methodoverride("_method"));
const wrapAsync=require("./init/utils/wrapAsync.js");
const router=require("./routes/listing.js");
const review=require("./routes/review.js");
app.listen(port,()=>{
    console.log(`app is listening on port ${port}`);
});
main().then((res)=>{
    console.log("connection established successfuly");
}).catch((err)=>{
    console.log(err);

});
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}
app.get("/",(req,res)=>{
    res.send("Hi! i am root");
});
app.use("/listings",router);
app.use("/listings/:id/reviews",review);



// app.all("/*splat",(req,res,next)=>{
//     next(new ExpressError(404,'Page not found!'));

// });
app.use((err,req,res,next)=>{
    let{statusCode=500,message="something went wrong"}=err;
    // res.status(statusCode).send(message);
  res.render("error.ejs",{err});
});
// app.use((err,req,res,next)=>{
//     res.send("Something went wrong");
// });



