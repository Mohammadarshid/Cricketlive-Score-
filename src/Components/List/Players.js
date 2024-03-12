import axios from "axios";
import React, { useEffect, useState } from "react";
import { PageNotFound } from "../PageNotFound/PageNotFound";
import { Networkerr } from "../PageNotFound/Networkerr";

export const Players = () => {
  const [match, setMatch] = useState([]);
  const [errmsg, setErrmsg] = useState("");
  useEffect(() => {
    let response = axios
      .get(
        "https://api.cricapi.com/v1/players?apikey=4cfe0ddb-8cda-47be-92bf-b64a933dfde3&offset=0"
      )
      .then((response) => {
        // console.log(response.data.data)
        setMatch(response.data.data);
      })
      .catch((err) => {
        setErrmsg(err.message);
        // console.log(err.message);
        // console.log(err)
      });
  }, []);

  return (
    <>
      {errmsg != "Network Error" ? (
        <div>
          {match ? (
            <div class="box-wrap">
              <div class="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Player Name</th>
                      <th>Country Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {match.map((country, index) => (
                      <tr key={index}>
                        <td>{country.name}</td>
                        <td>{country.country}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <PageNotFound />
          )}
        </div>
      ) : (
        <Networkerr />
      )}
    </>
  );
};
