
import React, { Component } from "react";
import InputPersonaliser from "./inputPersonaliser";
import ButtonSubmit from "../buttonsubmit"
import "./formeperso.css"
function Formpersonaliser({onSubmit, onChange, error={},objectvalue={},save = false}) {
  return (
    <form onSubmit={onSubmit}>
      <InputPersonaliser
        onChange={onChange}
        name="username"
        label="username"
        placeholder="username"
        value={objectvalue.username}
        error={error.username}
      />
      <InputPersonaliser
        onChange={onChange}
        name="passwort"
        label="passwort"
        placeholder="passwort"
        value={objectvalue.passwort}
        error={error.passwort}
      />
      <button type="submit"  className="buttonsubmit">
        {save?"save...":"edit"}
      </button>
    </form>
  );
}

export default Formpersonaliser;
