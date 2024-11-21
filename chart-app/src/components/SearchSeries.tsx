import { useState } from "react";
import { fetchFREDSeries } from "../services/chartService"

interface SearchFREDSeriesProps {
  onSelectSeries: (seriesId: string) => void;
}

const SearchFREDSeries = ({ onSelectSeries }: SearchFREDSeriesProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectQuery, setSelectQuery] = useState("GDP");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [debounceTimeout, setDebounceTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);

  const DEBOUNCE_DELAY = 1000;

  const fetchSearchResults = async (query: string) => {
    if (query.length < 3) {
      setSearchResults([]);
      return;
    }

    setLoading(true);

    try {
      const seriess: any = await fetchFREDSeries(query)
      setSearchResults(seriess);
    } catch (error) {
      console.error("Error loading data:", error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };


  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    
    setSearchQuery(query);
    
    if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
  
      const timeoutId = setTimeout(() => {
        fetchSearchResults(query);
      }, DEBOUNCE_DELAY);
  
      setDebounceTimeout(timeoutId);
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const query = e.target.value;
    
    setSelectQuery(query);
    
    if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
  
      const timeoutId = setTimeout(() => {
        fetchSearchResults(query);
      }, DEBOUNCE_DELAY);
  
      setDebounceTimeout(timeoutId);
  };

  console.log(searchResults);
  

  return (
    <div>
      <label>
        Search for FRED Series:
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search series (e.g., GDP, CPI)"
        />
      </label>
      <br />
      <label>
        Series ID (e.g., GDP, UNRATE):
        <select value={selectQuery} onChange={handleSelect}>
            <option value="GDP">GDP</option>
            <option value="UNRATE">UNRATE</option>
            <option value="CPIAUCSL">CPIAUCSL</option>
            <option value="FEDFUNDS">FEDFUNDS</option>
            <option value="PAYEMS">PAYEMS</option>
        </select>
     </label>
    <br />
      {loading && <p>Loading...</p>}
      {(searchQuery || selectQuery) && searchResults?.length > 0 && (
        <div>
          <h3>Search Results</h3>
          <ul>
            {searchResults.map((result) => (
              <li key={result?.id}>
                <button onClick={() => onSelectSeries(result?.id)}>
                  {result?.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {(searchQuery || selectQuery) && searchResults?.length === 0 && !loading && (
        <p>No results found for "{searchQuery}"</p>
      )}
    </div>
  );
};

export default SearchFREDSeries;
