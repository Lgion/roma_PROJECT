import React from 'react';

export default function OptionsCollapse({ onClick }) {
  return (
    <button 
      className="options-collapse-button"
      onClick={onClick}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="options-collapse-svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  );
}