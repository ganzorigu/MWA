angular.module("jobApp").controller("JobsController", JobsController);

function JobsController(JobDataFactory){
    console.log("test");
    var vm =this;
    vm.title = "Hello world";
    JobDataFactory.getAllJobs().then(function(response){
        console.log("response", response);
        vm.jobs = response;
    })

    vm.deleteJob = function(id) {
        console.log("delete job with Id: ", id);
        JobDataFactory.deleteOneJob(id).then(function(response){
            vm.status = response;
            alert("delete job with id:"+id);
            location.reload();
        })
    }

    vm.addJob = function() {
        console.log("add new job");
        var postData = {
            title : vm.newJobTitle,
            salary : vm.newJobSalary,
            locationCity : vm.newJobCity,
            locationState : vm.newJobState,
            description : vm.newJobDescription,
            experience : vm.newJobExperience,
            postDate : vm.newJobPostDate
        }

        JobDataFactory.addOneJob(postData).then(function(response){
            vm.status = response;            
            location.replace("/");
        })
    }
}