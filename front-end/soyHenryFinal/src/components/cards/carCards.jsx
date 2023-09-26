import React from "react";
import CarCard from "../card/carCard";
import { shuffleArray } from "../../../utils/utils";
import carCardStyles from "./carCards.module.css";

function CarCards({ vehicles }) {
  const shuffledVehicles = shuffleArray(vehicles);

  const remainingVehicles = shuffledVehicles.slice(4);

  return (
    <div className={carCardStyles.carCards}>
      <h2>Lista Completa de Vehículos:</h2>
      <div className={carCardStyles.allVehicles}>
        {remainingVehicles.map((vehicle) => (
          <CarCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>
    </div>
  );
}

export default CarCards;
