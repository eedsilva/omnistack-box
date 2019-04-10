const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');

const routes = express.Router();

const BoxCotroller = require('./controllers/BoxCotroller');
const FileController = require('./controllers/FileController');

//create a box
routes.post('/boxes', BoxCotroller.store);
routes.post('/boxes/:id/files', multer(multerConfig).single('file'), FileController.store);
routes.get('/boxes/:id', BoxCotroller.show);

module.exports = routes;