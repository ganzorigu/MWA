make following changes on the meanGames DB.
   
    db.games.update({}, {$set: {"publisher":[]}}, {multi:true});
    db.games.update({}, {$set: {"reviews":[]}}, {multi:true});

REST API

GET all games
http://localhost:4000/api/games/

GET one with gameId
http://localhost:4000/api/games/:gameId

POST new game 
http://localhost:4000/api/games/

parameters:    
    title: 
    year: 
    rate: 
    price: 
    minPlayers: 
    maxPlayers: 
    publisher: []
    reviews: []
    minAge: 
    designers: 

UPDATE one with gameID
http://localhost:4000/api/games/:gameId

parameters:    
    title: 
    year: 
    rate: 
    price: 
    minPlayers: 
    maxPlayers: 
    publisher: []
    reviews: []
    minAge: 
    designers: 

DELETE one with gameID
http://localhost:4000/api/games/:gameId




GET all publishers of game
http://localhost:4000/api/games/:gameId/publishers

GET one publisher with id
http://localhost:4000/api/games/:gameId/publishers/:publisherId

POST add new publisher in to this game
http://localhost:4000/api/games/:gameId/publishers

parameters:        
    lng : "longitude"
    lat : "latitude"        
    name 

UPDATE one with publisherId
http://localhost:4000/api/games/:gameId/publishers/:publisherId

parameters:        
    lng : "longitude"
    lat : "latitude"        
    name 

DELETE one with publisherId
http://localhost:4000/api/games/:gameId/publishers/:publisherId
