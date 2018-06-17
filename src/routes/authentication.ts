import { Router } from 'express';
const authentication = Router();

import { login, logout, register } from '../controllers/authentication.js';

authentication.post('/register', register);
authentication.post('/login', login);
authentication.post('/logout', logout);

export default authentication;
