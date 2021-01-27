angular.module("meanGames").controller("LoginController", LoginController);

function LoginController($http, $location, $window, AuthFactory, jwtHelper){
    var vm = this;
    vm.isLoggedIn = function() {
        if (AuthFactory.isLoggedIn) {return true;}
        else {return false;}
    };
    vm.login = function(){
        console.log("Login button pressed");
        console.log(vm.username);
        console.log(vm.password);
        if (vm.username && vm.password) {
            var user = {
                username: vm.username,
                password: vm.password
            };
            console.log("user login:", user);
            $http.post("/api/users/login", user).then(function(response) {
                console.log(response);
                if (response.data.success) {
                    $window.sessionStorage.token = response.data.token;
                    AuthFactory.isLoggedIn = true;
                }                
            }).catch(function(err) {
                console.log(err);
            });
        } 
    }
    vm.logout = function(){
        AuthFactory.isLoggedIn= false;
        delete $window.sessionStorage.token;
        $location.path("/");
    }

    vm.isActiveTab = function(url) {
        var currentPath = $location.path().split("/")[1];
        return (url === currentPath ? "active" : "");
    }
}