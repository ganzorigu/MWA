angular.module("myProperApp").controller("lyricsController", lyricsController);

function lyricsController($http) {
    var vm = this;
    vm.findLyrics = function (bandName, songName) {         
        $http.get(`https://api.lyrics.ovh/v1/${bandName}/${songName}`)        
         .then(function(response){
            vm.lyrics = response.data;
            console.log(response.data);
         });        
    };
};
