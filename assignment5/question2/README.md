## MEAN Games headless restful application.

**Note**: *including multiple publishers*

## REST API
**GET** all publishers of game
http://localhost:4000/api/games/:gameId/publishers

**GET** one publisher with id
http://localhost:4000/api/games/:gameId/publishers/:publisherId

**POST** add new publisher in to this game
http://localhost:4000/api/games/:gameId/publishers

**POST** parameters:      
```javascript
{  
    lng : Number
    lat : Number
    name : String
}
```

**UPDATE** one with publisherId
http://localhost:4000/api/games/:gameId/publishers/:publisherId

**UPDATE** parameters:      
```javascript
{
    lng : Number
    lat : Number
    name : String
}   
```
**DELETE** one with publisherId
http://localhost:4000/api/games/:gameId/publishers/:publisherId