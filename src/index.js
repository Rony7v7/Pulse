import express from 'express';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import indexRoutes from './routes/index.js';

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));

app.set('views', join(__dirname, 'views'));
app.set('view engine', 'ejs'); //modulo para añadir logica al html
app.use(indexRoutes);

// app.use(express.static(join(__dirname, 'public'))); //modulo para añadir css
app.use(express.static(join(__dirname, 'public'))); //modulo para añadir css

app.listen(3000)
console.log('Server on port', 3000);