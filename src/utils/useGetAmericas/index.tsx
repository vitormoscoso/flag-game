import { useState, useEffect } from "react";
import axios from "axios";
import useAxios from "../apiClient";

export default function useGetAmericas(currentPage: number) {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [data, setData] = useState<any>();
  const [countries, setCountries] = useState<string[]>();
  //   const [translatedNames, setTranslatedNames] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const countries = await axios.get<any>(
          `https://restcountries.com/v3.1/region/americas?fields=translations`
        );
        const countriesNames = countries.data.map((country: any) => {
          return country?.translations?.por?.common;
        });
        setData(countriesNames);
      } catch (err) {
        setError("Erro ao carregar dados");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [currentPage]);

  useEffect(() => {
    if (data !== null && data !== undefined) {
      let auxArray = [];
      for (let i = 0; i < 16; i++) {
        const randomIndex = Math.floor(Math.random() * data.length);
        auxArray.push(data[randomIndex]);
        // Remove o país escolhido para evitar duplicatas
        data.splice(randomIndex, 1);
      }
      setCountries(auxArray);
    }
  }, [data, currentPage]);

  const {
    data: test,
    options,
    text,
  } = useAxios(currentPage, countries ?? [], data);

  return {
    data: test,
    options,
    text,
    loading,
    error,
  };
}

// export default function useGetAllCountries(currentPage: number) {
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string>("");
//   const [data, setData] = useState<any>();
//   const [countries, setCountries] = useState<string[]>();
//   const [translatedNames, setTranslatedNames] = useState<any>();
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const countries = await axios.get<any>(
//           `https://restcountries.com/v3.1/all?fields=name`,
//         );
//         const countriesNames = countries.data.map((country: any) => {
//           return country.name.common;
//         });
//         setData(countriesNames);
//       } catch (err) {
//         setError("Erro ao carregar dados");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [currentPage]);

//   useEffect(() => {
//     if (data !== null && data !== undefined) {
//       let auxArray = [];
//       for (let i = 0; i < 16; i++) {
//         const randomIndex = Math.floor(Math.random() * data.length);
//         auxArray.push(data[randomIndex]);
//         // Remove o país escolhido para evitar duplicatas
//         data.splice(randomIndex, 1);
//       }
//       setCountries(auxArray);
//     }
//   }, [data]);

//   console.log(countries);

//   //   useEffect(() => {
//   //     const fetchData = async () => {
//   //       try {
//   //         const countries = await axios.get<any>(
//   //           `https://restcountries.com/v3.1/all?fields=name`,
//   //         );
//   //         const countriesNames = countries.data.map((country: any) => {
//   //           return country.name.common;
//   //         });
//   //         setData(countriesNames);
//   //       } catch (err) {
//   //         setError("Erro ao carregar dados");
//   //       } finally {
//   //         setLoading(false);
//   //       }
//   //     };

//   //     fetchData();
//   //   }, []);

//   return {
//     data,
//     loading,
//     error,
//   };
// }
