angular.module("jobApp", ["ngRoute"]).config(config);

function config($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl : "./angular-app/job-list/joblist.html",
            controller : "JobsController",
            controllerAs : "jobsCtrl"
        })
        .when("/jobs/:id", {
            templateUrl : "./angular-app/job-details/job-details.html",
            controller : "JobViewController",
            controllerAs : "JobViewCtrl"
        })
        .when("/addJob", {
            templateUrl : "./angular-app/job-list/jobAdd.html",
            controller : "JobsController",
            controllerAs : "jobsCtrl"
        })
        .when("/updateJob/:id", {
            templateUrl : "./angular-app/job-details/jobUpdate.html",
            controller : "JobViewController",
            controllerAs : "JobViewCtrl"
        })
}