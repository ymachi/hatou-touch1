import mongoose from "mongoose"

const gallerySchema = mongoose.Schema({
   
   image: {
     src: {
        type: String,
        required: true,
     },
     
     alt: {
        type: String,
        required: true,
     },
   },


}, {
   timestamps: true 
})

const Gallery = mongoose.model("Gallery", gallerySchema)

export default Gallery 