import { useState, useEffect } from "react";
import axios from "axios";

const translatedRegions: { [key: string]: string } = {
  "Western Africa": "da África Ocidental",
  "Eastern Asia": "da Ásia Oriental",
  "Western Asia": "da Ásia Ocidental",
  Caribbean: "do Caribe",
  "Eastern Africa": "da África Oriental",
  Polynesia: "da Polinésia",
  "Southeast Europe": "do Sudeste Europeu",
  "South-Eastern Asia": "domSudeste Asiatico",
  "Central America": "da América Central",
  "South America": "da América do Sul",
  "Northern Europe": "do Norte Europeu",
  "Southern Asia": "da Ásia do Sul",
  "Australia and New Zealand": "da Oceania",
  "Northern Africa": "da África do Norte",
  "Middle Africa": "da África Central",
  Micronesia: "da Micronésia",
  "North America": "da América do Norte",
  "Southern Europe": "do Sul Europeu",
  "Southern Africa": "da África do Sul",
  "Central Asia": "da Ásia Central",
  "Eastern Europe": "da Europa Oriental",
  "Western Europe": "da Europa Ocidental",
  Melanesia: "da Melanésia",
  "Central Europe": "da Europa Central",
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
  name: string,
  area: number,
  population: number,
  capital: string,
  nativeName: string,
  currency: { name: string; symbol: string },
  region: string
): string {
  const formattedArea = new Intl.NumberFormat("pt-BR", {
    style: "decimal",
  }).format(area);
  const formattedPop = new Intl.NumberFormat("pt-BR", {
    style: "decimal",
  }).format(population);

  return `${name}, conhecido oficialmente como ${nativeName}, é uma nação localizada na região da(o) ${translatedRegions[region]} e conta com uma população de aproximadamente ${formattedPop}. Possui uma área total de ${formattedArea} km² e sua capital é ${capital}, além de sua moeda oficial ser o(a) ${currency?.name} (${currency?.symbol})`;
}

type CountryData = {
  // name: { common: string; native: string };
  name: any;
  nativeName: { common: string };
  flags: { png: string };
  area: number;
  population: number;
  currencies: any;
  subregion: string;
  capital: string[];
  translations: { por: { common: string } };
  latlng: number[];
};

const useAxios = (currentPage: number) => {
  const [data, setData] = useState<CountryData[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [nativeName, setNativeName] = useState<string>();
  const [area, setArea] = useState<number>();
  const [population, setPopulation] = useState<number>();
  const [region, setRegion] = useState<string>("");
  const [currencies, setCurrencies] = useState<{
    name: string;
    symbol: string;
  }>();
  const [capital, setCapital] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [position, setPosition] = useState<{ lat: number; lng: number }>();
  const [answerOptions, setAnswerOptions] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<CountryData[]>(
          `https://restcountries.com/v3.1/translation/${
            countries[currentPage - 1]
          }?fields=name,flags,capital,area,subregion,population,translations,latlng,currencies`
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
        const currency = Object.keys(response?.data?.[0]?.currencies)?.[0];
        const currencyName = response?.data?.[0]?.currencies[currency].name;
        const currencySymbol = response?.data?.[0]?.currencies[currency].symbol;
        const nativeNameKey = Object.keys(
          response?.data?.[0]?.name?.nativeName
        )[0];
        const commonNative =
          response?.data?.[0]?.name?.nativeName[nativeNameKey]?.common;

        setNativeName(commonNative);
        shuffleArray(options);
        setAnswerOptions(options);
        setArea(response?.data?.[0]?.area);
        setPopulation(response?.data?.[0]?.population);
        setRegion(response?.data?.[0]?.subregion);
        setCapital(response?.data?.[0]?.capital?.[0]);
        setCountry(selectedCountry);
        setCurrencies({ name: currencyName, symbol: currencySymbol });
        setPosition({
          lat: response?.data?.[0]?.latlng[0],
          lng: response?.data?.[0]?.latlng[1],
        });
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
    position,
    options: answerOptions,
    text: getText(
      country,
      area !== undefined ? area : 0,
      population !== undefined ? population : 0,
      capital,
      nativeName !== undefined ? nativeName : "",
      currencies !== undefined ? currencies : { name: "", symbol: "" },
      region
    ),
    loading,
    error,
  };
};

export default useAxios;
