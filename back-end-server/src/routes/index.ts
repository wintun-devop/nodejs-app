import express from 'express';

// import routes
import { defaultRoute } from './default-route';


// declare the routes for router
export const routes = express.Router();


// register routes
routes.use("/test",defaultRoute)



