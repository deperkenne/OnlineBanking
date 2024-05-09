import React, { Component } from "react";
import "./inputpersonaliser.css"

function InputPersonaliser({
  label,
  placeholder,
  name,
  value,
  onChange,
  error,
  
})

{

  return (
    <div>
      <label htmlFor={name} className="label">{label}</label>
      <div className="inputpersonaliser">
        <input
          type="text"
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          error={error}
        />
        {error && <div style={{color:"red"}}>{error}</div>} 
      </div>
    </div>
  );
}

export default InputPersonaliser;
