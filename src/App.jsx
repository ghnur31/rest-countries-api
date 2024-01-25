import Header from "./Components/Header";
import Countries from "./Components/Countries";
import DetailCountry from "./Components/DetailCountry";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowLeft,
  faBookmark,
  faKey,
  faMoon,
  faSearch,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(faKey, faBookmark, faMoon, faSearch, faArrowLeft, faSun);

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [searchValue, setSearchValue] = useState('');
  const countriesInputRef = useRef();
  const regionRef = useRef();
  const navigate = useNavigate();
  const noCountries = countries.status || countries.message;

  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const fetchData = async () => {
    const response = await fetch("https://restcountries.com/v2/all");
    const data = await response.json();

    if (data.status === 404) {
      setCountries([]);
      return;
    }
    setCountries(data);
  };

  const searchCountries = async () => {
    const value = countriesInputRef.current.value.trim();
    setSearchValue(value);

    if (value.trim()) {
      const response = await fetch(`https://restcountries.com/v2/name/${value}`);
      const data = await response.json();

      // Filter results based on the selected region
      const filteredData =
        selectedRegion === "All"
          ? data
          : data.filter((country) => country.region === selectedRegion);

      setCountries(filteredData);
    } else {
      // If the search input is empty, fetch countries based on the selected region
      const selectValue = regionRef.current.value.trim();
      setSelectedRegion(selectValue);

      if (selectValue.trim()) {
        const response = await fetch(`https://restcountries.com/v2/region/${selectValue}`);
        const data = await response.json();

        if (selectValue === "All") {
          try {
            fetchData();
          } catch (error) {
            console.log(error);
          }
          return;
        }

        setCountries(data);
      } else {
        // If both search and region inputs are empty, fetch all countries
        fetchData();
      }
    }
  };

  const selectRegion = () => {
    const selectValue = regionRef.current.value;
    setSelectedRegion(selectValue);

    if (selectValue.trim()) {
      const fetchSelect = async () => {
        const response = await fetch(
          `https://restcountries.com/v2/region/${selectValue}`
        );

        const data = await response.json();

        if (selectValue === "All") {
          try {
            fetchData();
          } catch (error) {
            console.log(error);
          }
          return;
        }
        setCountries(data);
      };

      try {
        fetchSelect();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const showDetails = (code) => {
    navigate(`/${code}`);
  };

  return (
    <div className="bg-white dark:bg-bgDark dark:text-txDark">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <div className="w-full flex flex-col px-10 md:px-20 py-10 min-h-screen">
              <div className="w-full flex flex-col sm:flex-row justify-start sm:justify-between  mb-20 items-center sm:mt-16">
                <div className="flex items-center shadow-xl px-3 py-2 mt-16 sm:mt-0 mb-5 sm:mb-0 dark:bg-elDark rounded-xl">
                  <FontAwesomeIcon
                    icon="fa-solid fa-magnifying-glass"
                    className="text-gray-400 mr-3 text-xl"
                  />
                  <input
                    type="text"
                    placeholder="Search Country Here.."
                    className="p-2 dark:bg-elDark w-[300px]"
                    ref={countriesInputRef}
                    onChange={searchCountries}
                    value={searchValue}
                  />
                </div>

                <div className="w-full sm:w-[165px]">
                  <select
                    className="dark:bg-elDark p-3 hover:cursor-pointer focus:outline-none shadow-xl rounded-lg"
                    ref={regionRef}
                    onChange={selectRegion}
                    value={selectedRegion}
                  >
                    <option value="">Filter By Region</option>
                    <option value="All">All</option>
                    <option value="Africa">Africa</option>
                    <option value="Americas">America</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europe</option>
                    <option value="Oceania">Oceania</option>
                  </select>
                </div>
              </div>

              <div className="w-full flex flex-wrap justify-center sm:gap-x-0 lg:gap-x-[75px] items-center">
                {!noCountries ? (
                  countries.map((country) => (
                    <Countries
                      key={country.alpha3Code}
                      code={country.alpha3Code}
                      name={country.name}
                      capital={country.capital}
                      population={country.population.toLocaleString()}
                      region={country.region}
                      flag={country.flag}
                      showDetails={showDetails}
                    />
                  ))
                ) : (
                  <p>No Countries found....</p>
                )}
              </div>
            </div>
          }
        />

        <Route
          path="/:countryCode"
          element={
            <DetailCountry 
              countries={countries} 
              refetch={fetchData} 
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
