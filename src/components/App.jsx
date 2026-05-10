import React, { useState, useEffect } from "react";
import Header from "./Header";
import PlantPage from "./PlantPage";
 
/*
 * App is the single source of truth for the plant list.
 *
 * Why lift state here?
 *   - Both NewPlantForm (writes) and PlantList/Search (reads) need the same
 *     plants array.  Keeping it in a common ancestor avoids prop-drilling in
 *     the wrong direction and lets every child stay in sync automatically.
 *
 * State owned here:
 *   plants      – the canonical list fetched from the backend
 *   searchQuery – the string the user has typed in Search; stored here so
 *                 PlantList can derive a filtered view without its own fetch
 */
function App() {
  // ── 1. Declare state ──────────────────────────────────────────────────────
 
  // plants: starts empty; populated once the GET /plants fetch resolves
  const [plants, setPlants] = useState([]);
 
  // searchQuery: mirrors what the user types in Search; empty string = show all
  const [searchQuery, setSearchQuery] = useState("");
 
  // ── 2. Fetch all plants on mount ──────────────────────────────────────────
 
  /*
   * useEffect with an empty dependency array [] runs exactly once, after the
   * first render — the React equivalent of "on component mount / page load".
   *
   * We call the GET /plants endpoint and store the result in state.  Every
   * component that reads `plants` will re-render automatically once setState
   * resolves (React's reactivity model).
   */
  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((response) => response.json())   // parse the JSON body
      .then((data) => setPlants(data))        // push the array into state
      .catch((err) => console.error("Failed to load plants:", err));
  }, []); // [] = run only on mount, never again
 
  // ── 3. Handler: add a new plant (called by NewPlantForm after POST) ───────
 
  /*
   * After NewPlantForm POSTs to the backend and receives the newly-created
   * plant object (with its server-assigned id), it calls this handler.
   *
   * We append the new plant to the existing array using the spread operator
   * so we never mutate state directly — React requires immutable updates.
   */
  function handleAddPlant(newPlant) {
    setPlants((prevPlants) => [...prevPlants, newPlant]);
  }
 
  // ── 4. Handler: update search query (called by Search on every keystroke) ─
 
  /*
   * The Search component is controlled — it tells App what the user typed, and
   * App passes the derived filtered list back down to PlantList.  This keeps
   * Search "dumb" (no business logic) and PlantList "dumb" (no filtering
   * logic) while App acts as the coordinator.
   */
  function handleSearch(query) {
    setSearchQuery(query);
  }
 
  // ── 5. Derive filtered list ────────────────────────────────────────────────
 
  /*
   * We filter on every render rather than storing a separate filteredPlants
   * state.  Derived values should never be stored as state; computing them
   * from existing state is cheaper, simpler, and avoids synchronisation bugs.
   *
   * String.prototype.includes() is case-sensitive by default, so we lowercase
   * both sides for a friendlier UX (searching "aloe" finds "Aloe").
   */
  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
 
  // ── 6. Render ──────────────────────────────────────────────────────────────
 
  return (
    <div className="app">
      <Header />
      {/*
       * PlantPage receives everything it needs to pass further down:
       *   plants       → the filtered list to display
       *   onAddPlant   → callback for NewPlantForm
       *   onSearch     → callback for Search
       */}
      <PlantPage
        plants={filteredPlants}
        onAddPlant={handleAddPlant}
        onSearch={handleSearch}
      />
    </div>
  );
}
 
export default App;