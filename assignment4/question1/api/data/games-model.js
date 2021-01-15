var mongoose = require("mongoose");

const publisherSchema = new mongoose.Schema({
name: {
    type: String,
    required: true
},
country: {
    type: String,
    required: true
},
established: {
    type: Date,
    required: true
},
location: {
    address: String,
    coordinates: {
        types: [Number] // long(E/W), lat(N/S)
        //index: "2dphere"
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
    publisher: publisherSchema
});

mongoose.model("Game", gameSchema, "games"); // Collection in MongoDB is Games