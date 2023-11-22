import { useState, useEffect } from "react";
import axios from "axios";

function shuffleArray(array: string[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Troca os elementos
  }
  return array;
}

function getText(
  country: string,
  area: number,
  population: number,
  capital: string,
  continents: string
): string {
  const formattedArea = new Intl.NumberFormat("pt-BR", {
    style: "decimal",
  }).format(area);
  const formattedPop = new Intl.NumberFormat("pt-BR", {
    style: "decimal",
  }).format(population);

  return `${country} possui uma área de ${formattedArea} km², com uma população de ${formattedPop}. A capital é ${capital} e pertence ao continente da ${continents}.`;
}

const countries = [
  "Japan",
  "South Africa",
  "Nepal",
  "Canada",
  "Turkey",
  "New Zealand",
  "Mongolia",
  "Panama",
  "Switzerland",
  "Australia",
  "Kenya",
  "Jamaica",
  "Iceland",
  "Greece",
  "Italy",
];

type CountryData = {
  name: { common: string };
  flags: { png: string };
  area: number;
  population: number;
  continents: string[];
  capital: string[];
};

const useAxios = (currentPage: number) => {
  const [data, setData] = useState<CountryData[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [area, setArea] = useState<number>();
  const [population, setPopulation] = useState<number>();
  const [continent, setContinent] = useState<string>("");
  const [capital, setCapital] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [answerOptions, setAnswerOptions] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<CountryData[]>(
          `https://restcountries.com/v3.1/name/${
            countries[currentPage - 1]
          }?fields=name,flags,capital,area,continents,population`
        );
        setData(response.data);
        console.log(response?.data?.[0]);

        const selectedCountry = response?.data?.[0]?.name?.common;
        let options: string[] = [selectedCountry];
        let filteredCountries = countries.filter(
          (country) => country !== selectedCountry
        );
        for (let i = 0; i < 3; i++) {
          const randomIndex = Math.floor(
            Math.random() * filteredCountries.length
          );
          options.push(filteredCountries[randomIndex]);
          // Remove o país escolhido para evitar duplicatas
          filteredCountries.splice(randomIndex, 1);
        }
        shuffleArray(options);
        setAnswerOptions(options);
        setArea(response?.data?.[0]?.area);
        setPopulation(response?.data?.[0]?.population);
        setContinent(response?.data?.[0]?.continents?.[0]);
        setCapital(response?.data?.[0]?.capital?.[0]);
        setCountry(selectedCountry);
      } catch (err) {
        setError("Erro ao carregar dados");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  return {
    data,
    options: answerOptions,
    text: getText(
      country,
      area !== undefined ? area : 0,
      population !== undefined ? population : 0,
      capital,
      continent
    ),
    loading,
    error,
  };
};

export default useAxios;
