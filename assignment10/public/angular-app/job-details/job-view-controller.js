angular.module("jobApp").controller("JobViewController", JobViewController);

function JobViewController($routeParams, JobDataFactory, JobSkillDataFactory){
    var vm = this;
    var id = $routeParams.id;
    JobDataFactory.getOneJob(id).then(function(response){
        vm.job = response;
        vm.skills = response.skills;
    })

    vm.updateJob = function() {
        console.log("update new job");
        var postData = {
            title : vm.job.title,
            salary : vm.job.salary,
            locationCity : vm.job.location.city,
            locationState : vm.job.location.state,
            description : vm.job.description,
            experience : vm.job.experience,
            postDate : vm.job.postDate
        }

        console.log(postDate)
        JobDataFactory.updateOneJob(postData, id).then(function(response){
            vm.status = response;            
            location.replace("/");
        })
    }

    vm.addSkill = function() {
        console.log("adding new skill");
        var postData = {
            skill : vm.sSkill,
            description : vm.sDescription
        }
        console.log(postData);
        JobSkillDataFactory.addOneJobSkill(id, postData).then(function(response){
            vm.status = response;
            location.reload();
        })
    }

}