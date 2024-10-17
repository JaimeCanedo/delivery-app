import { Router } from "express";
import { usersController } from "../controllers/usersController.js";
import { vehiclesController } from "../controllers/vehiclesController.js";
import { tripsController } from "../controllers/tripsController.js";


const router = new Router();


router.get('/users/', usersController.getAll);
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


export default router;