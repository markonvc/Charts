import { useState } from "react";
import { fetchFREDSeries } from "../../services/chartService";
import { useSearchContext } from "../../state/SearchContext";

const SearchFREDSeries = () => {
  const { 
      searchQuery, 
      setSearchQuery, 
      selectQuery,
      setSelectQuery, 
      setSearchResults, 
      loading, 
      setLoading 
      } = useSearchContext();
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
            <option value="">-</option>
            <option value="GDP">GDP</option>
            <option value="UNRATE">UNRATE</option>
            <option value="CPIAUCSL">CPIAUCSL</option>
            <option value="FEDFUNDS">FEDFUNDS</option>
            <option value="PAYEMS">PAYEMS</option>
        </select>
     </label>
    <br />
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default SearchFREDSeries;
