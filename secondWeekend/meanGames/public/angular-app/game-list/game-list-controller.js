angular.module("meanGames").controller("GamesController", GamesController);

function GamesController(GameDataFactory){ 
    var vm = this;
    vm.title = "MEAN GAMES APP";
    vm.chosenTitle = "";
    GameDataFactory.getAllGames().then(function(response){
        vm.currPage = 0;
        vm.games = response;        
    });    
    GameDataFactory.searchGameCnt("").then(function(response){
        vm.pages = parseInt(response);        
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
                console.log(response);
            });
        }else {
            console.log("not valid");
            vm.isSubmitted = true;
        }        
    }    

    vm.deleteGame = function(id){
        console.log("delete game with id: ", id);
        GameDataFactory.deleteOneGame(id).then(function(response){            
            vm.status = response;
            alert("Delete game with id:"+id);
            let i = 0;
            for (i=0; i<vm.games; i++) {
                if (vm.games[i]._id==id) {
                    break;
                }
            }
            vm.games.splice(i, 1);
            console.log(vm.games);
            //location.reload();
        });
    }

    

    vm.getPageGames = function(chosenPage) {
        vm.currPage = chosenPage;
        console.log("page:", vm.currPage);
        GameDataFactory.searchGame(vm.chosenTitle, chosenPage).then(function(response){
            vm.games = response;            
        })        
    }


    vm.searchByTitle = function(title) {
        console.log("search the game title:", title);

        GameDataFactory.searchGameCnt(title).then(function(response){
            vm.pages = parseInt(response);        
        }); 

        GameDataFactory.searchGame(title,0).then(function(response){
            vm.games = response;
            vm.chosenTitle = title;            
        })
    }


}