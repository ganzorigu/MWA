Make following changes on the **meanGames** db on the mongodb.

```   
db.games.update({}, {$set: {"publisher":[]}}, {multi:true});
db.games.update({}, {$set: {"reviews":[]}}, {multi:true});
```

## REST API

* GET all games 
http://localhost:4000/api/games/

* GET one with gameId
http://localhost:4000/api/games/:gameId

* POST new game 
http://localhost:4000/api/games/

parameters:    
```
    title: String 
    year: Number
    rate: Number
    price: Number
    minPlayers: Number
    maxPlayers: Number
    publisher: [publisher]
    reviews: [publisher]
    minAge: Number
    designers: String
```
* UPDATE one with gameID
http://localhost:4000/api/games/:gameId

parameters:    
```
    title: String 
    year: Number
    rate: Number
    price: Number
    minPlayers: Number
    maxPlayers: Number
    publisher: [publisher]
    reviews: [publisher]
    minAge: Number
    designers: String
```

DELETE one with gameID
http://localhost:4000/api/games/:gameId

GET all publishers of game
http://localhost:4000/api/games/:gameId/publishers

GET one publisher with id
http://localhost:4000/api/games/:gameId/publishers/:publisherId

POST add new publisher in to this game
http://localhost:4000/api/games/:gameId/publishers

parameters:      
```  
    lng : Number
    lat : Number
    name : String
```

UPDATE one with publisherId
http://localhost:4000/api/games/:gameId/publishers/:publisherId

parameters:      
```  
    lng : Number
    lat : Number
    name : String
```

DELETE one with publisherId
http://localhost:4000/api/games/:gameId/publishers/:publisherId
