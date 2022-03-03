import { AppModel } from './app/app.model.js';
import { AppView } from './app/app.view.js';
import { AppController } from './app/app.controller.js';
import { expenses } from './expenses.js';

const app = new AppController(new AppModel(expenses), new AppView);