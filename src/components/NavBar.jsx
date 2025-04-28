import { Link } from "react-router-dom";
import "../index.css";

export default function NavBar() {
  return (
    <>
      <div className=" bg-gray-100 dark:bg-gray-900  ">
        <nav className="flex justify-between py-4 ">
          <div className="">
            <Link to="/">
              <span className="text-2xl font-bold text-[#db0000]">
                CINETRACKER
              </span>
            </Link>
          </div>
          <div className="flex  gap-5 sm:gap-10 text-md text-black dark:text-white">
            <Link to="/">
              <span className=" hover:text-gray-300">Home</span>
            </Link>
            <Link to="/favorites">
              <span className=" hover:text-gray-300">Favorites</span>
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
