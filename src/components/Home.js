import React from "react";
import Feed from "./Feed";
import { useContext } from "react";
import DataContext from "../context/Datacontext";

const Home = () => {
  const { searchResults } = useContext(DataContext);
  return (
    <main>
      {searchResults.length ? (
        <Feed posts={searchResults} />
      ) : (
        <p style={{ marginTop: "3rem" }}>No Posts To Display</p>
      )}
    </main>
  );
};

export default Home;
