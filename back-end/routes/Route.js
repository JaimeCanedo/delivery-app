import { Router } from "express";
import { usersController } from "../controllers/usersController.js";
import { vehiclesController } from "../controllers/vehiclesController.js";
import { tripsController } from "../controllers/tripsController.js";
import { ridesController } from "../controllers/ridesController.js";
import { booksController } from "../controllers/booksController.js";
import { paymentsController } from "../controllers/paymentsController.js";


const router = new Router();


router.get('/users/', usersController.getAll);
router.post('/login', usersController.loginUser);
router.get('/users/:id', usersController.getUserById);
router.post('/users/', usersController.createUser);
router.put('/users/:id', usersController.updateUser);
router.delete('/users/:id', usersController.deleteUser);

router.get('/vehicles/', vehiclesController.getAll);
router.get('/vehicles/:id', vehiclesController.getVehicleById);
router.post('/vehicles/', vehiclesController.createVehicle);
router.put('/vehicles/:id', vehiclesController.updateVehicle);
router.delete('/vehicles/:id', vehiclesController.deleteVehicle);

router.get('/trips/', tripsController.getAll);
router.get('/trips/:id', tripsController.getTripById);
router.post('/trips/', tripsController.createTrip);
router.put('/trips/:id', tripsController.updateTrip);
router.delete('/trips/:id', tripsController.deleteTrip);

router.get('/rides/', ridesController.getAll);
router.get('/rides/:id', ridesController.getRideById);
router.post('/rides/', ridesController.createRide);
router.put('/rides/:id', ridesController.updateRide);
router.delete('/rides/:id', ridesController.deleteRide);

router.get('/books/', booksController.getAll);
router.get('/books/:id', booksController.getBookById);
router.post('/books/', booksController.createBook);
router.put('/books/:id', booksController.updateBook);
router.delete('/books/:id', booksController.deleteBook);

router.get('/payments/', paymentsController.getAll);
router.get('/payments/:id', paymentsController.getPaymentById);
router.post('/payments/', paymentsController.createPayment);
router.put('/payments/:id', paymentsController.updatePayment);
router.delete('/payments/:id', paymentsController.deletePayment);

export default router;