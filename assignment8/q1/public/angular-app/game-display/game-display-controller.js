angular.module("meanGames").controller("SingleGameController", SingleGameController);

function _getStarRating(rate) {
    return new Array(rate);
}


function SingleGameController($routeParams, GameDataFactory){ 
    var vm = this;
    vm.title = "MEAN GAMES APP";
    var id = $routeParams.id;
    GameDataFactory.getOneGame(id).then(function(response){
        vm.games = response;
        vm.rating=_getStarRating(response.rate);
        var publishers = "";
        var pubs = response.publisher;        
        for (let i=0; i<pubs.length; i++) {
            publishers += pubs[i].name;
            if (i!=pubs.length-1) {
                publishers +=", ";
            }            
        }
        vm.publishers = publishers;
    });    
}