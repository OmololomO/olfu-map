import { useState } from "react";
import "./SearchBar.css";

export default function SearchBar({ scenes, onSelect }) {
  const [query, setQuery] = useState("");
  function highlightMatch(text, search) {
    const trimmedSearch = search.trim();

    if (!trimmedSearch) return text;

    const index = text.toLowerCase().indexOf(trimmedSearch.toLowerCase());

    if (index === -1) return text;

    return (
      <>
        {text.slice(0, index)}
        <mark>{text.slice(index, index + trimmedSearch.length)}</mark>
        {text.slice(index + trimmedSearch.length)}
      </>
    );
  }

  const results = Object.entries(scenes).filter(
    ([id, scene], index, entries) => {
      if (
        !["facility", "room"].includes(scene.sceneType) ||
        !scene.title?.trim().toLowerCase().includes(query.trim().toLowerCase())
      ) {
        return false;
      }

      // Show only one search result per facility in each building
      if (scene.sceneType === "facility") {
        const firstMatch = entries.find(
          ([otherId, otherScene]) =>
            otherScene.sceneType === "facility" &&
            otherScene.building === scene.building &&
            otherScene.title?.trim().toLowerCase() ===
              scene.title.trim().toLowerCase(),
        );

        return firstMatch?.[0] === id;
      }

      return true;
    },
  );

  function handleSearch() {
    if (results.length > 0) {
      onSelect(results[0][0]);
      setQuery("");
    }
  }

  return (
    <div className="search-bar">
      <div className="search-input-wrapper">
        <input
          type="text"
          placeholder="Search a room or location..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button
          type="button"
          className="search-button"
          onClick={handleSearch}
          aria-label="Search"
        >
          <svg
            viewBox="0 0 24 24"
            width="22"
            height="22"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-4-4" />
          </svg>
        </button>
      </div>

      {query.trim() && (
        <div className="search-results">
          {results.length > 0 ? (
            results.slice(0, 6).map(([id, scene]) => (
              <button
                key={id}
                type="button"
                onClick={() => {
                  onSelect(id);
                  setQuery("");
                }}
              >
                {highlightMatch(scene.title, query)}
              </button>
            ))
          ) : (
            <p>No locations found.</p>
          )}
        </div>
      )}
    </div>
  );
}
