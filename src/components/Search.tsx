import React from "react";
import "../styles/Search.scss";
interface SearchProps {
  setSearchTerm: (term: string) => void;
}

const Search: React.FC<SearchProps> = ({ setSearchTerm }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="search-bar">
      <input type="text" placeholder="Search" onChange={handleInputChange} />
    </div>
  );
};

export default Search;
