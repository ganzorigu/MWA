## Note:
Make following changes on the **meanGames** db on the mongodb.

```javascript   
db.games.update({}, {$set: {"publisher":[]}}, {multi:true});
db.games.update({}, {$set: {"reviews":[]}}, {multi:true});
```
