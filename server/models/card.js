import mongoose from 'mongoose';

const CardSchema = new mongoose.Schema({
    description : {
        type: String,
        default: "default"
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required : true,
        ref: 'User'
    }
});

const Card = mongoose.model('Card', CardSchema);

export default Card;