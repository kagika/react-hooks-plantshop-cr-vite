import React, { useState } from "react";
 
/*
 * PlantCard displays a single plant's information and lets the user toggle
 * whether it is "In Stock" or "Out of Stock".
 *
 * Props:
 *   plant – one plant object { id, name, image, price }
 *
 * Local state:
 *   inStock – boolean that tracks the stock status for this specific card.
 *             It starts as true (all plants begin in stock).
 *             This state lives here, not in App, because no other component
 *             needs to know an individual card's stock status — it's entirely
 *             self-contained.
 */
function PlantCard({ plant }) {
  // ── Stock status state ────────────────────────────────────────────────────
 
  /*
   * useState(true) → the plant is in stock by default.
   * Clicking the button simply flips this boolean with the "toggle" pattern:
   *   setInStock(prev => !prev)
   * Using the functional updater form guarantees we always toggle the most
   * current value, not a stale closure snapshot.
   */
  const [inStock, setInStock] = useState(true);
 
  // ── Toggle handler ────────────────────────────────────────────────────────
 
  function handleToggleStock() {
    // Flip the boolean: true → false (sold out) or false → true (back in stock)
    setInStock((prev) => !prev);
  }
 
  // ── Render ────────────────────────────────────────────────────────────────
 
  return (
    /*
     * data-testid="plant-item" is required by the test suite so tests can
     * find and count plant cards with queryAllByTestId('plant-item').
     */
    <li className="card" data-testid="plant-item">
      <img src={plant.image} alt={plant.name} />
 
      {/* h4 tag required — AllPlants test reads textContent from querySelector('h4') */}
      <h4>{plant.name}</h4>
 
      {/* p tag required — AllPlants test reads textContent from querySelector('p') */}
      <p>Price: {plant.price}</p>
 
      {/*
       * Conditional rendering based on inStock:
       *   true  → green "In Stock" button  (className="primary")
       *   false → grey  "Out of Stock" button (no extra class)
       *
       * Both buttons share the same onClick so a second click toggles back.
       */}
      {inStock ? (
        <button className="primary" onClick={handleToggleStock}>
          In Stock
        </button>
      ) : (
        <button onClick={handleToggleStock}>Out of Stock</button>
      )}
    </li>
  );
}
 
export default PlantCard;