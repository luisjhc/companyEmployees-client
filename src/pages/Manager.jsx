import React from "react";
import axios from "axios";
import * as CONSTS from "../utils/consts";
import LoadingComponent from "../components/Loading";

const Manager = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const [listOfCompanies, setListOfCompanies] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(`${CONSTS.SERVER_URL}/manager`, {
        headers: {
          authorization: localStorage.getItem(CONSTS.ACCESS_TOKEN),
        },
      })
      .then((response) => {
        setIsLoading(false);
        console.log("response:", response.data);
        return setListOfCompanies(response.data);
      })
      .catch((err) => {
        console.log("err:", err);
      });
  }, []);

  return (
    <div>
      {isLoading ? (
        <div>
          <h1>Requesting data</h1>
          <LoadingComponent />
        </div>
      ) : (
        <>
          <h2>Complete List of Companies</h2>
        </>
      )}
    </div>
  );
};

export default Manager;
