angular.module("meanGames").controller("GamesController", GamesController);

function GamesController(GameDataFactory){ 
    var vm = this;
    vm.title = "MEAN GAMES APP";
    GameDataFactory.getAllGames().then(function(response){
        vm.games = response;
    });
    
    vm.addGame = function() {
        console.log("adding game");
        var postData = {
            title : vm.newGameTitle,
            price : vm.newGamePrice,
            year : vm.newGameYear,
            rate : vm.newGameRate,
            minPlayers : vm.newGameMinPlayers,
            maxPlayers : vm.newGameMaxPlayers,
            minAge : vm.newGameMinAge,
            designers : vm.newGameDesigner
        };
        if (vm.gameForm.$valid) {
            GameDataFactory.addOneGame(postData).then(function(response){
                console.log("game Saved");
            });
        }else {
            vm.isSubmitted = true;
        }        
    }    

    vm.deleteGame = function(id){
        console.log("delete game with id: ", id);
        GameDataFactory.deleteOneGame(id).then(function(response){            
            vm.status = response;
            alert("Delete game with id:"+id);
            location.reload();
        });
    }

}