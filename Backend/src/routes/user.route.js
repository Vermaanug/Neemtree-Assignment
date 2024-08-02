import { Router } from 'express';
import {Register , UpdateUser, getUsers } from '../controllers/user.controller.js';

const route = Router();

route.route('/users').get(getUsers)

route.route('/register').post(Register);

route.route("/users/:id").get(UpdateUser)

route.route("/users/:id").put(UpdateUser)

export default route;
