import React from "react";
import PlantCard from "./PlantCard";
 
/*
 * PlantList is a pure presentational component.
 * It receives a plants array and maps each element to a PlantCard.
 *
 * Props:
 *   plants – array of plant objects (already filtered by App before arrival)
 *
 * Key prop:
 *   Every item in a mapped list needs a unique `key` so React can efficiently
 *   reconcile the virtual DOM when the list changes.  We use plant.id because
 *   it is guaranteed unique by the backend.
 */
function PlantList({ plants }) {
  return (
    <ul className="cards">
      {plants.map((plant) => (
        <PlantCard key={plant.id} plant={plant} />
      ))}
    </ul>
  );
}
 
export default PlantList;
 
