import { useEffect, useState } from "react";

export type Car = {
  id: string;
  modelName: string;
  bodyType: string;
  modelType: string;
  imageUrl: string;
};

export type Filter = {
  value: string;
  label: string;
  count: number;
};

export const useCars = () => {
  const [cars, setCars] = useState<Car[]>();
  const [filters, setFilters] = useState<Filter[]>();
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const fetchCars = async () => {
    try {
      const response = await fetch("./api/cars.json");
      const data = await response.json();
      const extractedFilters = Object.values(
        data.reduce(
          (acc: { [key: string]: Filter }, item: Car) => {
            const existingFilter = acc[item.bodyType] ?? {
              label:
                item.bodyType.length > 4
                  ? item.bodyType
                  : item.bodyType.toUpperCase(),
              value: item.bodyType,
              count: 0,
            };

            const all = acc["all"];

            return {
              ...acc,
              all: { ...all, count: all.count + 1 },
              [item.bodyType]: {
                ...existingFilter,
                count: existingFilter.count + 1,
              },
            };
          },
          {
            all: {
              label: "All",
              value: "all",
              count: 0,
            },
          }
        )
      ) as Filter[];

      setCars(data);
      setFilters(extractedFilters ?? []);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return {
    cars: cars?.filter((car) =>
      activeFilter === "all" ? true : car.bodyType === activeFilter
    ),
    filters,
    setActiveFilter,
    activeFilter,
  };
};
