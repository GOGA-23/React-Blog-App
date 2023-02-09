import { Link } from "react-router-dom";
import { useContext } from "react";
import DataContext from "../context/Datacontext";

const Navbar = () => {
  const { search, setSearch } = useContext(DataContext);
  return (
    <nav>
      <form className="navbar" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="search"></label>
        <input
          id="search"
          type="search"
          placeholder="Search Posts"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
      <ul className="lists">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/post">Post</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
