const express=require("express");
const router=express.Router();
const Listing=require("../models/listing.js");
const wrapAsync=require("../init/utils/wrapAsync.js");
const ExpressError=require("../init/utils/ExpressError.js");

// Index Route
router.get(
  "/",
  wrapAsync(async (req, res) => {
    const allListing = await Listing.find({});
    res.render("listings/index.ejs", { allListing });
  })
);

// New Route
router.get("/new", (req, res) => {
  res.render("listings/new.ejs");
});

// Show Route
router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    res.render("listings/show.ejs", { listing });
  })
);

//edit route
router.get("/:id/edit",wrapAsync (async (req,res)=>{
        let{id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});

}));
//update route
router.put("/:id",wrapAsync (async(req,res)=>{
   let{id}=req.params;
   await Listing.findByIdAndUpdate(id,{...req.body.listing});
   res.redirect("/listings");
}));
// delete route
router.delete("/:id",wrapAsync (async (req,res)=>{
let{id}=req.params;
let deleteListing=await Listing.findByIdAndDelete(id);
res.redirect("/listings");
}));
module.exports=router;
