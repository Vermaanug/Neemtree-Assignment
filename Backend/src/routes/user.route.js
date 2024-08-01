import { Router } from 'express';
import {Register , getUsers } from '../controllers/user.controller.js';

const route = Router();

route.route('/users').get(getUsers)

route.route('/register').post(Register);

export default route;
