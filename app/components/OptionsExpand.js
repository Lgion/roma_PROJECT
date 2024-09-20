import React from 'react';

export default function OptionsExpand({ onClick }) {
  return (
    <button 
      className="options-expand-button"
      onClick={onClick}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="options-expand-svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
      </svg>
    </button>
  );
}