import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function LoggedIn(props) {
  const client_id = process.env.REACT_APP_CLIENT_ID;
  const client_secret = process.env.REACT_APP_CLIENT_SECRET;
  const base64 = `Basic ${btoa(client_id)}:${btoa(client_secret)}`;

  useEffect(() => {
    let code = props.location.search;
    console.log(code);
    var authorization_code = "";
    for (var i = 6; i < code.length; i++) {
      authorization_code += code[i];
    }
    console.log("Auth code:", authorization_code, "Base64: ", base64);
    axios
      .post("/api/spotify", { authorization_code: authorization_code })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="row">
      <div className="col">
        <div
          className="card"
          style={{
            width: "18rem",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
          }}
        >
          <div className="card-body">
            <h5 className="card-title">
              You are now logged into your Spotify account!
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoggedIn;
