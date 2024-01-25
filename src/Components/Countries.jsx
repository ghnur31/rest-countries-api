

const Countries = (props) => {
  const { name, capital, population, region, flag, code, showDetails } = props;

  const showDetailsHandler = () => {
    showDetails(code);
  };

  return (
    <div
      className="w-4/5 sm:w-2/5 lg:w-1/5 dark:bg-elDark rounded-md shadow-xl overflow-hidden mb-10 hover:scale-105 transition-all hover:cursor-pointer dark:shadow-lg dark:shadow-elLight"
      key={code}
      onClick={showDetailsHandler}
    >
      <img src={flag} alt="" className="w-full object-cover h-[150px]" />
      <div className="p-3">
        <h2 className="text-xl font-bold mb-2">{name}</h2>
        <div className="flex w-full justify-between">
          <p className="w-1/3">Population</p>
          <p className="w-3/5 text-left">: {population}</p>
        </div>
        <div className="flex w-full justify-between">
          <p className="w-1/3">Region</p>
          <p className="w-3/5 text-left">: {region}</p>
        </div>
        <div className="flex w-full justify-between">
          <p className="w-1/3">Capital</p>
          <p className="w-3/5 text-left">: {capital}</p>
        </div>
      </div>
    </div>
  );
};

export default Countries;
