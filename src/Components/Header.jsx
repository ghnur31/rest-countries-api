import DarkMode from "../Features/DarkMode";


const Header = () => {
  return (
    <div className="w-full fixed bg-white dark:bg-bgDark z-10 flex justify-between px-5 sm:px-20 py-5 shadow-xl items-center">
      <div className="text-lg sm:text-2xl font-bold">
        <h1>Where in the world?</h1>
      </div>

      <DarkMode/>
    </div>
  );
};

export default Header;
