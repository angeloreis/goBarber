import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';
import AvaliableController from './app/controllers/AvaliableController';

const routes = new Router();
const upload = multer(multerConfig);

// criar usuário para acesso
routes.post('/users', UserController.store);

// criar sessão de login
routes.post('/sessions', SessionController.store);

//  Só pode acessar essas rotas se tiver autenticado!
routes.use(authMiddleware);

//  Tudo o que tenho sobre Agendamentos para o cliente
routes.get('/appointments', AppointmentController.index);
routes.post('/appointments', AppointmentController.store);
routes.delete('/appointments/:id', AppointmentController.delete);

//  Agendamentos para o provedor
routes.get('/schedules', ScheduleController.index);

//  Notificações para o provedor
routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

//  Tudo que tenho sobre usuarios
routes.get('/providers', ProviderController.index);
routes.get('/providers/:providerId/avaliable', AvaliableController.index);
routes.put('/users', UserController.update);

//  Tudo que tenho sobre Arquivos/Upload
routes.post('/files', upload.single('file'), FileController.store);

export default routes;
