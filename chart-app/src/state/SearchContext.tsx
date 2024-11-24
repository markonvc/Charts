import React, { createContext, useState, ReactNode, useContext } from "react";

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectQuery: string;
  setSelectQuery: (query: string) => void;
  searchResults: any[];
  setSearchResults: (results: any[]) => void;
  loading: boolean;
  setLoading: (loadingState: boolean) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectQuery, setSelectQuery] = useState("-");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        selectQuery,
        setSelectQuery,
        searchResults,
        setSearchResults,
        loading,
        setLoading,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = (): SearchContextType => {
    const context = useContext(SearchContext);
    if (context === undefined) {
      throw new Error("useSearchContext must be used within a SearchProvider");
    }
    return context;
  };