import mongoose from 'mongoose'

let Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

let dishesSchema = new Schema({
    name       : String,
    price      : Number,
    timestamp  : Date,
    restaurant : {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant'
    }
});

export default mongoose.model('Dishes', dishesSchema);
