import express from 'express';

// import routes
import { defaultRoute } from './default-route';
import { registerRoute } from './user/register';
import { profileRoute } from './user/profile';


// declare the routes for router
export const routes = express.Router();


// register routes
routes.use("/test",defaultRoute)
routes.use("/user/create",registerRoute)
routes.use("/user/profile",profileRoute)



