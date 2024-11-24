import { useSearchContext } from "../../state/SearchContext";
import "./SearchResult.css"

interface SearchFREDSeriesProps {
    onSelectSeries: (seriesId: string) => void;
}

const SearchResult = ({ onSelectSeries }: SearchFREDSeriesProps) => {
    const { searchQuery, selectQuery, searchResults, loading } = useSearchContext()

    console.log(searchQuery, selectQuery, searchResults, loading);
    


    return (
        <div className={searchQuery || selectQuery && searchResults.length > 0 ? "show-result" : "no-result"}>
                <div className="container">
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
            {
                (searchQuery || selectQuery) && searchResults?.length === 0 && !loading && (
                <p>No results found for "{searchQuery}"</p>
                )
            }
        </div>
    )
}

export default SearchResult