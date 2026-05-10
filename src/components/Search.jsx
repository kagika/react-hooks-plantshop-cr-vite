import React, { useState } from "react";
 
/*
 * Search is a controlled input component.
 *
 * It owns its own local display state (so the input updates as the user types),
 * and also calls the onSearch callback so App can filter the plant list.
 *
 * Why not store the query only in App?
 *   Technically we could, but keeping a local `searchTerm` in Search makes the
 *   component self-contained for testing and reuse.  The two values stay in
 *   sync because we update both on every change event.
 *
 * Props:
 *   onSearch – callback provided by App; receives the current search string
 */
function Search({ onSearch }) {
  // ── Local state for the controlled input ──────────────────────────────────
 
  const [searchTerm, setSearchTerm] = useState("");
 
  // ── Change handler ────────────────────────────────────────────────────────
 
  /*
   * On every keystroke:
   *   1. Update local state so the input re-renders with the typed character.
   *   2. Notify App via onSearch — App will derive a new filteredPlants array
   *      and pass it down to PlantList, which re-renders automatically.
   *
   * Because filtering happens in App on every render, deleting characters
   * (including clearing the field entirely) immediately restores the full list
   * with no extra logic needed here.
   */
  function handleChange(e) {
    const query = e.target.value;
    setSearchTerm(query); // keep the input controlled
    onSearch(query);      // propagate upward so App can filter
  }
 
  // ── Render ────────────────────────────────────────────────────────────────
 
  return (
    <div className="searchbar">
      <label htmlFor="search">Search Plants:</label>
      {/*
       * placeholder="Type a name to search..." is the exact string the test
       * suite uses with getByPlaceholderText — don't change it.
       */}
      <input
        type="text"
        id="search"
        placeholder="Type a name to search..."
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
}
 
export default Search;
 