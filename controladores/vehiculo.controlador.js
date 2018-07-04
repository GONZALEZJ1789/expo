var almacen_vehiculos = {
	                       vehiculos:
	                        [ 
	                           {
									marca:"Toyota", 
									modelo: "Yaris", 
									placa: "xy33"
								},
								{
									marca:"Ford",
									modelo: "Explorer Limited",
									placa: "8767AC"
								}
                            ]                  
                        };

class vehiculosControlador{

	//Cantidad de cambios de aceite
	cambiosAceite(kilometraje){
		return new Promise((resolve,reject)=>{
			//Cálculo de la cantidad de cambios de aceite
	      	var resultado = kilometraje/5000;
	      	//Verifico si el valor obtenido en la operación es numérico para mostrarlo al usuario
	       	(isNaN(resultado)) ? reject('El resultado no es un número') : resolve(resultado);
		});
	};

	//Cantidad de cambios de bujías
	cambiosBujias(kilometraje){
		return new Promise((resolve,reject)=>{
			//Cálculo de la cantidad de cambios de bujías
	      	var resultado = kilometraje/15000;
	      	//Verifico si el valor obtenido en la operación es numérico para mostrarlo al usuario
	      	(isNaN(resultado)) ? reject('El resultado no es un número') : resolve(resultado);
		});
	};

	/*Método para resolver casos asíncronos y mostrar los resultados cuando ambos estén listos*/
	async(){
		
		return new Promise(function(resolve, reject){

			var caso1 = new Promise(function(resolve, reject) {
			    setTimeout(resolve, 2000, almacen_vehiculos.vehiculos[0]);
			})

			var caso2 = new Promise(function(resolve, reject) { 
			    setTimeout(resolve, 1000, almacen_vehiculos.vehiculos[1]);
			})

			Promise.all([caso1, caso2])
			.then((value)=> {
				resolve(value);
				console.log(respuesta);
			})
			.catch((err)=> {
				reject('ERROR'+err);
			})
		})	
	}

	/*Método para resolver casos asíncronos y mostrar los resultados en orden de resolución (secuencial)*/
	vehiculo1(){
		//Atención del primer vehículo
		return new Promise((resolve,reject)=>{
        	setTimeout(()=>{
        		resolve(almacen_vehiculos.vehiculos[0]);
        	}, 1000);
		});
	}

	vehiculo2(){
		//Atención del segundo vehículo
		return new Promise((resolve,reject)=>{
        	setTimeout(()=>{
        		resolve(almacen_vehiculos.vehiculos[1]);
        	}, 700);
		});
	}

}

module.exports = new vehiculosControlador();