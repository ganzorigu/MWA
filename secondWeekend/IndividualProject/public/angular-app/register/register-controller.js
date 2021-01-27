angular.module("bookApp").controller("RegisterController", RegisterController);

function RegisterController($http) {
    var vm = this;
    vm.register = function() {
        var user = {name : vm.name, username : vm.username, password: vm.password};
        console.log("register new user:", user);
        if (!vm.username || !vm.password) { vm.err = "Please add a username and password";}
        else {
            if (vm.password != vm.passwordRepeated) {
                vm.err = "Please make sure the passwords match.";
                console.log("password dont match");
            } else {
                $http.post("/api/users/register", user).then(function(result) {
                    console.log(result);
                    vm.message = "Successful registration, please login.";
                    vm.err = "";
                }).catch(function(err){console.log(err);});
            }
        }
    }
}
