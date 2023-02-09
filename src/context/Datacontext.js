import { createContext, useState, useEffect } from "react";
import api from "../api/posts";

const DataContext = createContext(); //it returns a "provider" object

export const DataProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  //It will Only run once,When the component gets mounted
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get("/posts");
        setPosts(res.data);
      } catch (error) {
        if (error.res) {
          console.log(error.res.status);
          console.log(error.res.data);
        } else {
          console.log(`Error : ${error.message}`);
        }
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const filterResults = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filterResults.reverse());
  }, [posts, search]);

  return (
    <DataContext.Provider
      value={{
        search,
        setSearch,
        searchResults,
        posts,
        setPosts,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
