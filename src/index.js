import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import indexRoutes from './routes/index.js';

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.urlencoded({ extended: true })); //modulo para enviar datos desde el formulario
app.use(bodyParser.json()); //modulo para enviar datos desde el formulario


app.set('views', join(__dirname, 'views'));
app.set('view engine', 'ejs'); //modulo para añadir logica al html
app.use(indexRoutes);

app.use(express.static(join(__dirname, 'public'))); //modulo para añadir css

app.listen(3000)
console.log('Server on port', 3000);