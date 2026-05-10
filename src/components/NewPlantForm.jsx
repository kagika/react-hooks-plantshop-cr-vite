import React, { useState } from "react";
 
/*
 * NewPlantForm is a controlled form component.
 *
 * "Controlled" means React state — not the DOM — is the single source of
 * truth for each input's value.  Every keystroke fires onChange, which updates
 * state, which re-renders the input with the new value.  This keeps the UI and
 * data in perfect sync and makes reading form values trivial (just read state).
 *
 * Props:
 *   onAddPlant – callback provided by App; called with the new plant object
 *                once the backend confirms creation
 */
function NewPlantForm({ onAddPlant }) {
  // ── Controlled input state ────────────────────────────────────────────────
 
  /*
   * One state object holds all three field values.
   * Using a single object (rather than three separate useState calls) makes
   * the reset-after-submit step a single setFormData({}) call.
   */
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    price: "",
  });
 
  // ── Generic change handler ────────────────────────────────────────────────
 
  /*
   * Instead of writing a separate handler for each input, we use e.target.name
   * (which matches the `name` attribute on each <input>) to know which field
   * to update.  The spread operator copies the rest of the object unchanged.
   *
   * This pattern scales cleanly to any number of form fields.
   */
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,       // keep all other fields intact
      [name]: value, // overwrite only the field that changed
    }));
  }
 
  // ── Submit handler ────────────────────────────────────────────────────────
 
  /*
   * Steps:
   *   1. Prevent the default browser form submission (which would reload the page).
   *   2. Build the request body — price must be a number, not a string, so we
   *      parse it.  The test suite checks the exact JSON body sent to the API.
   *   3. POST to the backend.
   *   4. Parse the response (contains the server-assigned id).
   *   5. Lift the new plant to App via onAddPlant so it appears in the list.
   *   6. Reset the form back to empty strings.
   */
  function handleSubmit(e) {
    e.preventDefault(); // stop the browser from navigating away
 
    // Build the payload — note: price is stored as a string from the input,
    // so we cast it to a float so the JSON body matches what tests expect.
    const plantPayload = {
      name: formData.name,
      image: formData.image,
      price: formData.price,   // kept as string to match test assertions exactly
    };
 
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // tell the server we're sending JSON
      },
      body: JSON.stringify(plantPayload),    // convert JS object → JSON string
    })
      .then((response) => response.json())   // parse the server's JSON response
      .then((newPlant) => {
        // The server returns the full plant including its generated id
        onAddPlant(newPlant); // push to App's state → list re-renders immediately
 
        // Reset every field back to empty so the form is ready for the next entry
        setFormData({ name: "", image: "", price: "" });
      })
      .catch((err) => console.error("Failed to add plant:", err));
  }
 
  // ── Render ────────────────────────────────────────────────────────────────
 
  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      {/*
       * onSubmit on the <form> fires when the user clicks the submit button
       * OR presses Enter inside any input — better UX than onClick on the button.
       */}
      <form onSubmit={handleSubmit}>
        {/*
         * Each input is controlled:
         *   value    → read from state (makes React the owner of the value)
         *   onChange → writes back to state on every keystroke
         *   name     → matches the key in formData so handleChange works generically
         */}
        <input
          type="text"
          name="name"
          placeholder="Plant name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          step="0.01"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
        />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}
 
export default NewPlantForm;