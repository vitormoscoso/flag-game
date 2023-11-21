import { useState, useEffect } from "react";
import axios from "axios";

const countries = [
  "japan",
  "south africa",
//   "nepal",
//   "canada",
//   "turkey",
//   "new zealand",
//   "mongolia",
//   "india",
//   "switzerland",
//   "australia",
//   "kenya",
//   "jamaica",
//   "iceland",
//   "greece",
//   "italy",
];

type CountryData = {
  name: { common: string };
  flags: { png: string };
};

const useAxios = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        for (const country of countries) {
          const response = await axios.get<any[]>(
            `https://restcountries.com/v3.1/name/${country}?fullText=true`
          );

          setData((currentData) => [...currentData, response.data]);
        }
      } catch (err) {
        setError("Erro ao carregar dados");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export default useAxios;
