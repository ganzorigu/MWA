## MEAN Games restful application.

**Note**: *including reviews and publisher*

## REST API
**GET** all reviews of game
http://localhost:4000/api/games/:gameId/reviews

**GET** one review with id
http://localhost:4000/api/games/:gameId/reviews/:reviewId

**POST** add new review in to this game
http://localhost:4000/api/games/:gameId/reviews

**POST** parameters:      
```javascript
{  
    reviewer : String,
    reviewData : String,
    reviewText : String
}
```

**UPDATE** one with publisherId
http://localhost:4000/api/games/:gameId/reviews/:reviewId

**UPDATE** parameters:      
```javascript
{  
    reviewer : String,
    reviewData : String,
    reviewText : String
}
```
**DELETE** one with reviewId
http://localhost:4000/api/games/:gameId/reviews/:reviewId