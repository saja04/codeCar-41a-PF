import React from "react";
import carCardStyles from "./carCard.module.css";
import { Link } from "react-router-dom";

function CarCard({ vehicle, showPricesInUSD }) {
  return (
    <div className={carCardStyles.conteiner}>
      <div className={carCardStyles.carCard}>
        <h2>
          {vehicle.marca} {vehicle.modelo}
        </h2>
        <img src={vehicle.imagen} alt={`${vehicle.marca} ${vehicle.modelo}`} />
        <p>Color: {vehicle.color}</p>
        <p>Año: {vehicle.año}</p>
        <p>Motor: {vehicle.tipo_de_motor}</p>
        <p>
          {showPricesInUSD
            ? `USD$${vehicle.precio_usd}`
            : `ARS$${vehicle.precio_ars}`}
        </p>{" "}
        <div>
          <button type="submit">Agregar al carrito</button>
          <Link to={`/detail/${vehicle.id}`}>
            <button>Detalle</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CarCard;

