import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams, useNavigate } from "react-router-dom";

const DetailCountry = ({ countries, refetch }) => {
  const params = useParams();
  const navigate = useNavigate();

  let name;
  let flagImg;
  let nativeName;
  let population;
  let region;
  let subregion;
  let capital;
  let topLevelDomain;
  let currencies = [];
  let languages = [];
  let borders = [];

  countries?.forEach((country) => {
    if (country.alpha3Code === params.countryCode) {
      name = country.name;
      flagImg = country.flag;
      nativeName = country.nativeName;
      population = parseInt(country.population).toLocaleString();
      region = country.region;
      subregion = country.subregion;
      capital = country.capital;
      topLevelDomain = country.topLevelDomain;

      country.currencies?.forEach((currency) => {
        currencies.push(currency.name);
      });
      country.languages?.forEach((language) => {
        languages.push(language.name);
      });
      country.borders?.forEach((border) => {
        borders.push(border);
      });
    }
  });

  const goBack = () => {
    navigate("/");
  };

  return (
    <div className="w-full flex flex-col  px-5 sm:px-20 py-10 min-h-screen">
      <div
        className="flex w-[130px] items-center gap-x-2 py-3  mb-10 sm:mb-16 justify-center dark:bg-elDark rounded-lg hover:cursor-pointer mt-16 shadow-xl"
        onClick={goBack}
      >
        <FontAwesomeIcon icon="fa-solid fa-arrow-left" className="text-xl " />
        <p className="text-xl">Back</p>
      </div>

      <div className=" w-full flex flex-col sm:flex-row">
        <div className="w-full sm:w-1/2 mb-10 sm:mb-0">
          <img src={flagImg} alt="" className="w-[500px] shadow-xl " />
        </div>

        <div className="w-full sm:w-1/2 ">
          <h2 className="text-3xl mb-5 font-bold">{name}</h2>

          <div className="flex flex-col sm:flex-row  w-full font-semibold mb-10">
            <div className="w-full sm:w-1/2 ">
              <p className="mb-2">
                Native Name : <span className="font-medium">{nativeName}</span>
              </p>
              <p className="mb-2">
                Population : <span className="font-medium">{population}</span>
              </p>
              <p className="mb-2">
                Region : <span className="font-medium">{region}</span>
              </p>
              <p className="mb-2">
                Sub Region : <span className="font-medium">{subregion}</span>
              </p>
              <p className="mb-2">
                Capital : <span className="font-medium">{capital}</span>
              </p>
            </div>
            <div className="w-full sm:w-1/2">              
              <p className="mb-2">
                Top Level Domain : <span className="font-medium">{topLevelDomain}</span></p>
                
              <p className="mb-2">
                Currencies : <span className="font-medium">{currencies}</span>
              </p>
              <p className="mb-2">
                Languages : <span className="font-medium">{languages}</span>
              </p>
            </div>  
          </div>

          <div className="w-full flex flex-col :sm:flex-row items-start">
            <p className="font-semibold mr-10">Border Countries :</p>
            <div className="flex flex-wrap mt-5">
              {borders.length ? (
                borders.map((border, index) => (
                  <div
                    key={index}
                    className="mb-3 p-2 mx-2 shadow-xl dark:bg-elDark hover:cursor-pointer"
                    onClick={() => {
                      refetch();
                      navigate(`/${border}`);
                    }}
                  >
                    {border}
                  </div>
                ))
              ) : (
                <p>No Border Countries...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailCountry;
