const mongoose=require("mongoose");
const schema=mongoose.Schema;
const listingschema=new schema({
    title:{type:String,required:true},
    description:String,
    image:{filename:String,url:String},
    price:Number,
    location:String,
    country:String,
    reviews:[{
        type:schema.Types.ObjectId,
        ref:"Review"
    }]
});
const Listing=mongoose.model("Listing",listingschema);
module.exports=Listing;