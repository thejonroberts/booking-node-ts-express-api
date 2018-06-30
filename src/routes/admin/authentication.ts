import { Router } from 'express';
const authentication = Router();

import { login, logout, register } from '../../controllers/api/authentication';

authentication.post('/api/v1/register', register);
authentication.post('/api/v1/login', login);
authentication.post('/api/v1/logout', logout);

export default authentication;
