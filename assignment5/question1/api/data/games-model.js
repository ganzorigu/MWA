var mongoose = require("mongoose");


const reviewSchema = new mongoose.Schema({
    reviewer: {
        type : String,
        required: true
    },
    reviewDate: {
        type : String,
        required: true
    },
    reviewText: {
        type : String,
        required : true
    }
    
});

const publisherSchema = new mongoose.Schema({
name: {
    type: String
    //required: true
},
country: {
    type: String
    //required: true
},
established: {
    type: Date
    //required: true
},
location: {
    address: String,
    coordinates: {
        type: [Number], // long(E/W), lat(N/S)
        index: "2dphere"
    }
    
}
});

const gameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: Number,
    designers: [String],
    minPlayers: {
        type: Number,
        min: 1,
        max: 10
    },
    maxPlayers: {
        type: Number,
        min: 1,
        max: 10
    },
    rate: {
        type: Number,
        min: 1,
        max: 5,
        "default": 1
    },
    publisher: [publisherSchema],
    reviews : [reviewSchema]
});

mongoose.model("Game", gameSchema, "games"); // Collection in MongoDB is Games