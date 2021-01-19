angular.module("myProperApp").controller("AboutController", AboutController);

function AboutController() {
    var vm = this;
    vm.name = "This is my bio";
}