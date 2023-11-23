import { useState, useEffect } from "react";
import axios from "axios";

const translatedRegions: { [key: string]: string } = {
  "Western Africa": "África Ocidental",
  "Eastern Asia": "Ásia Oriental",
  "Western Asia": "Ásia Ocidental",
  Caribbean: "Caribe",
  "Eastern Africa": "África Oriental",
  Polynesia: "Polinésia",
  "Southeast Europe": "Europa do Sudeste",
  "South-Eastern Asia": "Ásia do Sudeste",
  "Central America": "América Central",
  "South America": "América do Sul",
  "Northern Europe": "Europa do Norte",
  "Southern Asia": "Ásia do Sul",
  "Australia and New Zealand": "Austrália e Nova Zelândia",
  "Northern Africa": "África do Norte",
  "Middle Africa": "África Central",
  Micronesia: "Micronésia",
  "North America": "América do Norte",
  "Southern Europe": "Europa do Sul",
  "Southern Africa": "África do Sul",
  "Central Asia": "Ásia Central",
  "Eastern Europe": "Europa Oriental",
  "Western Europe": "Europa Ocidental",
  Melanesia: "Melanésia",
  "Central Europe": "Europa Central",
};

const countries = [
  "Japão",
  "África do Sul",
  "Nepal",
  "Canadá",
  "Turquia",
  "Nova Zelândia",
  "Mongólia",
  "Panamá",
  "Suíça",
  "Austrália",
  "Quénia",
  "Jamaica",
  "Islândia",
  "Grécia",
  "Itália",
];

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
  region: string
): string {
  const formattedArea = new Intl.NumberFormat("pt-BR", {
    style: "decimal",
  }).format(area);
  const formattedPop = new Intl.NumberFormat("pt-BR", {
    style: "decimal",
  }).format(population);

  return `${country} possui uma área de ${formattedArea} km², com uma população de ${formattedPop}. A capital é ${capital} e pertence à região do(a) ${translatedRegions[region]}.`;
}

type CountryData = {
  name: { common: string };
  flags: { png: string };
  area: number;
  population: number;
  subregion: string;
  capital: string[];
  translations: { por: { common: string } };
};

const useAxios = (currentPage: number) => {
  const [data, setData] = useState<CountryData[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [area, setArea] = useState<number>();
  const [population, setPopulation] = useState<number>();
  const [region, setRegion] = useState<string>("");
  const [capital, setCapital] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [answerOptions, setAnswerOptions] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<CountryData[]>(
          `https://restcountries.com/v3.1/translation/${
            countries[currentPage - 1]
          }?fields=name,flags,capital,area,subregion,population,translations`
        );
        setData(response.data);

        const selectedCountry = response?.data?.[0]?.translations?.por?.common;
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
        setRegion(response?.data?.[0]?.subregion);
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
      region
    ),
    loading,
    error,
  };
};

export default useAxios;
