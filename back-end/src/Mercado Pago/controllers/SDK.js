// const mercadopago = require('mercadopago');
// mercadopago.configurations.setAccessToken('TEST-8027820177433735-101013-d8bd5f51ad6362c4dfb1913c39abdd7d-1275939038');
// Mercado Pago SDK

const { ACCESS_TOKEN_MP, HOST } = process.env;
const mercadopago = require("mercadopago");
const { UserOrder, Car } = require("../../db");

const createOrder = async (req, res) => {
  const { name, price, userId, carId, carModelo, carMarca, userEmail } = req.body;
  const fecha = new Date();
  try {
    mercadopago.configure({
      access_token: ACCESS_TOKEN_MP,
    });

    const priceNum = parseInt(price);

    const result = await mercadopago.preferences.create({
      items: [
        {
          currency_id: "ARG",
          title: name,
          quantity: 1,
          unit_price: priceNum,
          description: carId,
        },
      ],
      back_urls: {
        success: `https://code-car-41a-pf-7u9q.vercel.app/userOrder`,
        pending: `https://code-car-41a-pf-7u9q.vercel.app/userOrder`,
        failure: `https://code-car-41a-pf-7u9q.vercel.app/userOrder`,
      },
      notification_url: "https://codecar.onrender.com/webhook",
    });
    if (result) {
      const createInDb = await UserOrder.create({
        order_status: "aPagar",
        order_date: fecha.toString(),
        car_order: carId,
        user_order: userId,
        medio_de_pago: "mp",
        car_modelo: carModelo,
        car_marca: carMarca,
        car_precio_ars: price,
        user_email: userEmail
      });

      const carById = await Car.findByPk(carId);
      if(carById){
        carById.deleted = true;
        carById.save()
      }
      console.log('car borrado');
    }
    res.json(result.body.init_point);
  } catch (error) {
    res.send(error);
  }
};

const receiveWebhook = async (req, res) => {
  const payment = req.query;
  try {
    if (payment.type === "payment") {
      const data = await mercadopago.payment.findById(payment["data.id"]);
      console.log(data.body.additional_info.items[0].description);
      if (
        data.body.additional_info.items[0].description
      ) {
        const searchInDb = await UserOrder.findOne({
          where: { car_order: data.body.additional_info.items[0].description },
        });
        searchInDb.order_status = "listoARetirar";
        await searchInDb.save();
        console.log('estado de la compra guardado');
        console.log(searchInDb);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createOrder,
  receiveWebhook,
};
