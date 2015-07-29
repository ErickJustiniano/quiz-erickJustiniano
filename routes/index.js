var express = require('express');
var router = express.Router();

var quizController = 	require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');

//Página de entrada (home page)
router.get('/', function(req, res, next) {
 	res.render('index', { title: 'Quiz', errors: []});
});

//Autoload de comandos con :quizId
router.param('quizId', quizController.load);	//autoload :quizId

//Definicion de las rutas de session
router.get('/login', 							 sessionController.new); 	//Formulario de login
router.post('/login',							 sessionController.create); //Crear sesion
router.get('/logout',							 sessionController.destroy);//Destruir sesion

//Definicion de la rutas de /quizes
router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', 			 quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', 		 quizController.answer);
router.get('/quizes/new', 						 quizController.new);
router.post('/quizes/create', 					 quizController.create);
router.get('/quizes/:quizId(\\d+)/edit', 		 quizController.edit);
router.put('/quizes/:quizId(\\d+)', 			 quizController.update);
router.delete('/quizes/:quizId(\\d+)', 			 quizController.destroy);

//Definicion de las rutas de comentarios
router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments',	 commentController.create);

//Definicion de rutas de ejercicios
router.get('/author', function(req, res, next) {
  res.render('author', { nombre: 'Erick Alberto Justiniano Caamal', errors: [] });
});

module.exports = router;
