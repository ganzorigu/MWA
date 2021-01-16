## Note:
Make following changes on the **meanGames** db on the mongodb.

```javascript   
db.games.update({}, {$set: {"publisher":[]}}, {multi:true});
db.games.update({}, {$set: {"reviews":[]}}, {multi:true});
```
![Alt text](./screenshots/Q2_3PublisherAddOne.png?raw=true "Optional Title")