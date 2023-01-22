// Podríamos crear otro export const Login, tantos como queramos
// en este mismo archivo, es decir, de esta forma podemos tener varios componentes
// PERO 1 EXPORT DEFAULT AL FINAL DE LA PÁGINA

// PARA PONER LO MISMO EN TODAS LAS CLASSName, SELECCIONAS 1 Y CONTROL + D VAS COGIENDO TODAS
import React, { useContext } from "react";
import config from "../config.js";

export const Login = () => {
  const onLogin = async () => {
    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;

    console.log({ email, password });

    const res = await fetch("${config.HOSTNAME}/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    const data = await res.json();

    if (res.status == 200) {
      const token = data.data;
      localStorage.token = JSON.stringify({ token });
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <div className="container">
        <div className="mb-3">
          <label htmlFor="email-input" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email-input"
            placeholder="name@example.com"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password-input" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password-input"
            placeholder="·······"
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={onLogin}>
          Submit
        </button>
      </div>
    </div>
  );
};
