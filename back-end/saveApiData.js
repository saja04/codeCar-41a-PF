const axios = require("axios");
const { Car } = require("./src/db");
const api = require("./API");

const saveApiData = async () => {
  try {

    const search = api.map(async (car) => {
      let carInDB = await Car.findOrCreate({
        where: {
          car_modelo: car.modelo,
          car_marca: car.marca,
          car_año: car.año,
          car_color: car.color,
          car_tipo_de_motor: car.tipo_de_motor,
          car_tipo_de_auto: car.tipo_de_auto,
          car_precio_usd: car.precio_usd,
          car_precio_ars: car.precio_ars,
          car_kilometraje: car.kilometraje,
          car_condicion: car.condicion,
          car_imagen: car.imagen,
        },
      });
    });
    const allCars = await Car.findAll();
    if (allCars.length > 0) {
      console.log("autos cargados a db correctamente");
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = saveApiData;
