import { useEffect, useState } from "react";

export type Car = {
  id: string;
  modelName: string;
  bodyType: string;
  modelType: string;
  imageUrl: string;
};

export const useCars = () => {
  const [cars, setCars] = useState<Car[] | null>(null);

  const fetchCars = async () => {
    try {
      const response = await fetch("./api/cars.json");
      const data = await response.json();
      console.log("GET", data);
      setCars([...data]);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    fetchCars();
  }, []);
  console.log(cars);
  return cars;
};
