// Podríamos crear otro export const Login, tantos como queramos
// en este mismo archivo, es decir, de esta forma podemos tener varios componentes
// PERO 1 EXPORT DEFAULT AL FINAL DE LA PÁGINA
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import config from "../config.js";

export const Private = () => {
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // request
    const tokenOBJ = localStorage.token;
    if (tokenOBJ) {
      navigate("/login");
    }
    const tokenData = JSON.parse(tokenOBJ);

    fetch("${config.HOSTNAME}/api/private", {
      method: "GET",
      headers: {
        Authorization: "Bearer ${tokenData.token}",
      },
    })
      .then((res) => {
        console.log({ res });
        return res.json();
      })
      .then((data) => {
        console.log({ data });
        setDisabled(false);
      });
  }, [disabled]);

  if (disabled) {
    return <div>Cargando...</div>;
  }

  return <div>Private</div>;
};
