import React from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";
 
/*
 * PlantPage is a layout / orchestration component.
 * It does not own any state — it simply receives props from App and fans them
 * out to the three children that live on the main page.
 *
 * Props:
 *   plants      – filtered array of plant objects to render
 *   onAddPlant  – callback to lift a newly-created plant up to App
 *   onSearch    – callback to lift the current search string up to App
 */
function PlantPage({ plants, onAddPlant, onSearch }) {
  return (
    <main>
      {/* Pass the POST handler down so NewPlantForm can add plants */}
      <NewPlantForm onAddPlant={onAddPlant} />
 
      {/* Pass the search handler down so Search can update the query in App */}
      <Search onSearch={onSearch} />
 
      {/* Pass the (already-filtered) plants array so PlantList can render it */}
      <PlantList plants={plants} />
    </main>
  );
}
 
export default PlantPage;
 