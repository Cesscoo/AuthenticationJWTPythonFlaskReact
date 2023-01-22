// Podríamos crear otro export const Login, tantos como queramos
// en este mismo archivo, es decir, de esta forma podemos tener varios componentes
// PERO 1 EXPORT DEFAULT AL FINAL DE LA PÁGINA
import React from "react";
import { useNavigate } from "react-router-dom";
import config from "../config.js";

export const Signup = () => {
  const navigate = useNavigate();
  const onSignup = async () => {
    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;
    const password2 = document.getElementById("password-input-2").value;

    // VALIDACIONES

    if (password.lenght < 4) {
      alert("Formato de clave incorrecto!!");
      return;
    }
    if (password !== password2) {
      alert("Las contraseñas no son iguales");
      return;
    }

    const body = JSON.stringify{{
      email,
      password,
      password2,
    }};

    const res = await fetch('${config.HOSTNAME}/api/signup' , {
      method: "POST",
      headers: {"Content-Type": "application/json",
    },
    body,
    });
    
    const data = await res.json()
    if (res.status != 201) {
      alert(data.msg);
      return;
    }
    // ----- 
    console.log('el usuario de creo correcatmente');
    navigate('/login')
  };

  return (
    <div>
      <h1>SignUp</h1>
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
        <div className="mb-3">
          <label htmlFor="password-input-2" className="form-label">
            Password 2
          </label>
          <input
            type="password"
            className="form-control"
            id="password-input-2"
            placeholder="·······"
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={onSignup}>
          Submit
        </button>
      </div>
    </div>
  );
};
