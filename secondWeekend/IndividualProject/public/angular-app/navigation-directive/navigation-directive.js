angular.module("bookApp").directive("ngNav", GamesNavigation);
function GamesNavigation() {
    return {
        restrict: "A",
        templateUrl: "angular-app/navigation-directive/navigation-directive.html"
    };
}