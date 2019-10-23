const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const WishSchema = Schema({
    item:String
});

mongoose.model("wishes",WishSchema)