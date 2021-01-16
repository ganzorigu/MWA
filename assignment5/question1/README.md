## REST API

* **GET** all games 
http://localhost:4000/api/games/

* **GET** one with gameId
http://localhost:4000/api/games/:gameId

* **POST** new game 
http://localhost:4000/api/games/

 **POST** parameters:    
```javascript
    {
        title: String, 
        year: Number,
        rate: Number,
        price: Number,
        minPlayers: Number,
        maxPlayers: Number,
        publisher: [publisher],
        reviews: [publisher],
        minAge: Number,
        designers: String,
    }
```
* **UPDATE** one with gameID
http://localhost:4000/api/games/:gameId

**UPDATE** parameters:    
```javascript
{
    title: String, 
    year: Number,
    rate: Number,
    price: Number,
    minPlayers: Number,
    maxPlayers: Number,
    publisher: [publisher],
    reviews: [publisher],
    minAge: Number,
    designers: String
}
    
```

**DELETE** one with gameID
http://localhost:4000/api/games/:gameId