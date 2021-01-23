const express = require("express");
const jobsController = require("../controllers/jobsController");
const skillsController = require("../controllers/skillsController");
const router = express.Router();


router.route("/jobs")
        .get(jobsController.jobsGetAll)
        .post(jobsController.jobsAddOne);
router.route("/jobs/:jobId")
        .get(jobsController.jobsGetOne)
        .put(jobsController.jobsUpdateOne)
        .delete(jobsController.jobsDeleteOne);
        
router.route("/jobs/:jobId/skills")
        .get(skillsController.skillsGetAll)
        .post(skillsController.skillsAddOne);

router.route("/jobs/:jobId/skills/:skillId")
        .get(skillsController.skillsGetOne)     
        .put(skillsController.skillsUpdateOne)
        .delete(skillsController.skillsDeleteOne);
module.exports = router;
