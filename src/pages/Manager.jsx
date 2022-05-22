import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import * as CONSTS from "../utils/consts";
import LoadingComponent from "../components/Loading";
import * as PATHS from "../utils/paths";
import Companies from "../components/Lists/Companies";

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
        // console.log("response:", response.data);
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
        <Companies listOfCompanies={listOfCompanies} />
      )}
      <Link to={PATHS.EMPLOYEES}>Show Employees</Link>
      <Link to={PATHS.ASSIGNEMPLOYEES}>Assign Employees</Link>
    </div>
  );
};

export default Manager;
