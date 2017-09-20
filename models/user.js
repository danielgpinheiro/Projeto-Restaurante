import mongoose from 'mongoose'

let Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

let userSchema = new Schema({
    name       : String,
    email      : String,
    pass       : String
});

export default mongoose.model('User', userSchema);
