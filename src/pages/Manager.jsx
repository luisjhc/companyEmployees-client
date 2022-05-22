import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import * as CONSTS from "../utils/consts";
import LoadingComponent from "../components/Loading";
import * as PATHS from "../utils/paths";
import "./pagesCss/manager.css";

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
        <div className="manager_container">
          <h2>Complete List of Companies</h2>
          {listOfCompanies.map((company) => (
            <div key={company._id}>
              <ul className="manager_ul">
                <li>
                  <h3>{company.business_name}</h3>
                  <ul>
                    <li>Industry: {company.industry}</li>
                    <li>Type: {company.type}</li>
                    <li>Employee: {company.employee}</li>
                  </ul>
                </li>
              </ul>
            </div>
          ))}
        </div>
      )}
      <div className="links">
        <Link to={PATHS.EMPLOYEES} className="linkA">
          Show Employees
        </Link>
        <Link to={PATHS.ASSIGNEMPLOYEES} className="linkB">
          Assign Employees
        </Link>
      </div>
    </div>
  );
};

export default Manager;
