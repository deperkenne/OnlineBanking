import React from "react";
import "./inputpersonaliser.css";
function InputNumber({name,onChange,error,value,placeholder,label}){
  return (
    <div>
      <label htmlFor={name} className="label">
        {label}
      </label>
      <div className="inputpersonaliser">
        <input
          type="number"
          name={name}
          placeholder={placeholder}
          value={value}
          error={error}
          onChange={onChange}
          
        />
        {error && <div style={{ color: "red" }}>{error}</div>}
      </div>
    </div>
  );
}

export default InputNumber;