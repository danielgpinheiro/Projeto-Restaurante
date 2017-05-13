import mongoose from 'mongoose'

let Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

let RestaurantSchema = new Schema({
    name       : String,
    timestamp  : Date
});

export default mongoose.model('Restaurant', RestaurantSchema);
