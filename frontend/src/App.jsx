import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { supabase } from "./postsScript/supabaseClient";

import Root from "./components/root/Root";
import SearchPage from "./components/searchPage/SearchPage";
import HowItStarted from "./components/howItStarted/HowItStarted";
import ScrollToTop from "./components/scrollToTop/ScrollToTop";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [soldiersData, setSoldiersData] = useState([]);
  const [searchedSoldiers, setSearchedSoldiers] = useState([]);
  const [notFoundError, setNotFoundError] = useState(false);

  useEffect(() => {
    async function loadSoldiers() {
      const res = await fetch("http://localhost:4001/soldiers");
      const data = await res.json();
      setSoldiersData(data);
      const normalized = data.map((row) => ({
        name: row.name,
        imgSrc: row.imgSrc,
        permalink: row.permalink,
        likeCount: row.like_count,
        commentsCount: row.comments_count,
      }));
      setSoldiersData(normalized);
    }
    loadSoldiers();
  }, []);

  const handleSearch = (searchText) => {
    setSearchValue(searchText);
    const trimmed = searchText.trim();

    if (!trimmed) {
      setSearchedSoldiers([]);
      setNotFoundError(false);
      return;
    }

    const filtered = soldiersData.filter((s) => s.name.includes(trimmed));
    setSearchedSoldiers(filtered);
    setNotFoundError(filtered.length === 0);
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Root />}>
          <Route
            index
            element={
              <SearchPage
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                handleSearch={handleSearch}
                searchedSoldiers={searchedSoldiers}
                notFoundError={notFoundError}
              />
            }
          />
          <Route path="how-it-started" element={<HowItStarted />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
