import React, { useState, useEffect } from "react";
import style from "../delete/delete.module.css";
import Pagination from "../../components/pagination/pagination";
import axios from "axios";
import CardsAdmin from "../../components/cardsAdmin/cardsAdmin";

function Delete() {
  const [vehicles, setVehicles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const vehiclesPerPage = 16;

  const paginatedVehicles = Array.isArray(vehicles)
    ? vehicles.slice(
        (currentPage - 1) * vehiclesPerPage,
        currentPage * vehiclesPerPage
      )
    : [];

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    async function fetchVehicles() {
      try {
        const response = await axios.get("https://codecar.onrender.com/cars");
        setVehicles(response.data);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    }
    fetchVehicles();
  }, []);

  const handleDelete = async (carId) => {
    try {
      await axios.delete(`https://codecar.onrender.com/cars/delete/${carId}`);
  
      setVehicles((prevVehicles) =>
        prevVehicles.filter((vehicle) => vehicle.car_id !== carId)
      );
  
      alert("Automóvil borrado satisfactoriamente.");
    } catch (error) {
      console.error("Error al eliminar el vehículo:", error);
  
      alert("No se pudo eliminar el automóvil. Inténtelo de nuevo.");
    }
  };
  
  

  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.filters}>
         
        </div>
        <div className={style.cards}>
          <CardsAdmin vehicles={paginatedVehicles} onDelete={handleDelete} />
          <div className={style.pagination}>
            <Pagination
              vehiclesPerPage={vehiclesPerPage}
              totalVehicles={Array.isArray(vehicles) ? vehicles.length : 0}
              paginate={paginate}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Delete;
