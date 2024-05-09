
import React, { Component } from "react";
import InputPersonaliser from "../../signinup/inputPersonaliser/inputPersonaliser";
import InputNumber from "../../signinup/inputPersonaliser/inputNumber";
import "./überweisungpage.css"

function ÜberweisungForm({
  onSubmit,
  onChange,
  error ={},
  newobjectvalue={}
  
}) {
  return (
    <form onSubmit={onSubmit} className="boxshadow">
      <InputPersonaliser
        name="newname"
        label="newname"
        placeholder="newname"
        value={newobjectvalue.newname}
        error={error.newname}
        onChange={onChange}
      />
      <InputPersonaliser
        name="nummer"
        label="nummer"
        placeholder="nummer"
        value={newobjectvalue.nummer}
        error={error.nummer}
        onChange={onChange}
      />

      <InputNumber
        label="montant"
        name="montant"
        placeholder="montant"
        value={newobjectvalue.montant}
        error={error.montant}
        onChange={onChange}
      />
      <button type="submit" className="buttonsubmit">
        send
      </button>
    </form>
  );
}

export default ÜberweisungForm;
