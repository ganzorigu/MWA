angular.module("meanGames").factory("GameDataFactory", GameDataFactory);

function GameDataFactory($http){
    return {
        getAllGames: getAllGames,
        getOneGame: getOneGame,
        addOneGame: postGame,
        deleteOneGame : deleteGame,
        searchGame : searchGame,
        searchGameCnt : searchGameCnt
    };

    function getAllGames() {
        return $http.get("/api/games").then(complete).catch(failed);
    }

    function getOneGame(id) {
        return $http.get("/api/games/"+id).then(complete).catch(failed);
    }

    function postGame(game){
        return $http.post("/api/games/", game).then(complete).catch(failed);
    }

    function deleteGame(id) {
        return $http.delete("/api/games/"+id).then(complete).catch(failed);
    }
    
    function searchGame(title,page) {
        return $http.get("/api/searchGames?title="+title+"&page="+page).then(complete).catch(failed);
    }
    
    function searchGameCnt(title) {
        return $http.get("/api/searchGamesCnt?title="+title).then(complete).catch(failed);
    }

    function complete(response){        
        return response.data;
    }
    function failed(error) {
        return error.status.statusText;
    }
}