import React from 'react';

export default function OptionsForm() {
  return (
    <div className="options-form">
      <h2>Options</h2>
      <form>
        <div className="form-group">
          <label htmlFor="option1">Option 1</label>
          <input type="text" id="option1" />
        </div>
        <div className="form-group">
          <label htmlFor="option2">Option 2</label>
          <input type="text" id="option2" />
        </div>
        <button type="submit">
          Soumettre
        </button>
      </form>
    </div>
  );
}