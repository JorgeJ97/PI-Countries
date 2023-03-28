const {Router} = require('express');
const activitiesRouter = Router();
const {getActivitiesHandler, createActivityHandler} = require('../handlers/activitiesHandler')



activitiesRouter.get('/', getActivitiesHandler);
activitiesRouter.post('/', createActivityHandler);





module.exports = activitiesRouter;