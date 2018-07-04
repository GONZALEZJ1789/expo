var express = require('express');
var router = express.Router();
var vehiculosControlador = require('../controladores/vehiculo.controlador');


/*
  RUTA PARA CALCULAR LA CANTIDAD DE CAMBIOS DE ACEITE Y BUJÍAS DE UN VEHÍCULO, 
  O UN ERROR SI NO FUNCIONÓ EL CÁLCULO
*/
router.post('/servicio', function(req, res, next) {
  //Recibo del formulario la cantidad de kilómetros recorridos de un vehículo
  var kilometraje = req.body.kilometraje;
  
  //Paso como parámetro el kilometraje
  vehiculosControlador.cambiosAceite(kilometraje)
   .then( (resultado)=> {
      console.log('Cambios de Aceite: '+resultado);
    })              
   .catch((err)=>{
      console.log('ERROR: '+err);
    });

  //Paso como parámetro el kilometraje
  vehiculosControlador.cambiosBujias(kilometraje)
   .then( (resultado)=> {
      console.log('Cambios de Bujías: '+resultado);
   })
   .catch((err)=>{
      console.log('ERROR: '+err);
    });

  res.send();
});

/*
  RUTA PARA MOSTRAR RESULTADOS DE DOS PROCESOS CUANDO AMBOS ESTÉN LISTOS
*/
router.get('/servicio/paralelo', function(req, res, next) {
  //Hago el llamado de la clase junto con el método que muestra todas las promesas: Promise.all();  
  vehiculosControlador.async()
  .then( (resultado)=> {
      res.send(resultado);
      console.log(resultado);
   })
   .catch((err)=>{
      res.send('ERROR: '+err)
      console.log('ERROR: '+err);
    });

  //res.send();
});


/*
  RUTA PARA MOSTRAR DOS PROCESOS EN EL ORDEN EN QUE SON RESUELTOS
*/
router.get('/servicio/secuencial', function(req, res, next) {
  //Primer proceso  
  vehiculosControlador.vehiculo1()
   .then( (resultado)=> {
      //Características del primer vehículo
      console.log('Vehículo 1: ', resultado);
    })              
   .catch(()=>{
      console.log('Ha ocurrido un error inesperado');
    });

  //Segundo proceso
  vehiculosControlador.vehiculo2()
   .then( (resultado)=> {
      //Características del segundo vehículo
      console.log('Vehículo 2: ', resultado);
   })
   .catch(()=>{
      console.log('Ha ocurrido un error inesperado');
    });

  res.send();
});

module.exports = router;