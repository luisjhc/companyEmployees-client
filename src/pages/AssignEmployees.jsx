import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import * as CONSTS from "../utils/consts";
import LoadingComponent from "../components/Loading";
import * as PATHS from "../utils/paths";
import EmployeesAndCompanies from "../components/Lists/EmployeesAndCompanies";
import "./pagesCss/assignEmployees.css";

function AssignEmployees() {
  const [isLoading, setIsLoading] = React.useState(false);
  // The list with the employees not assigned will be sent to the EmployeesAndCompanies component
  const [employeesNotAssigned, setEmployeesNotAssigned] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(`${CONSTS.SERVER_URL}/employees/employeesNotAssigned`, {
        headers: {
          authorization: localStorage.getItem(CONSTS.ACCESS_TOKEN),
        },
      })
      .then((response) => {
        setIsLoading(false);
        // console.log("response:", response.data);
        return setEmployeesNotAssigned(response.data);
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
        <EmployeesAndCompanies employeesNotAssigned={employeesNotAssigned} />
      )}
      <div className="links">
        <Link to={PATHS.MANAGER} className="linkA">
          Show Companies
        </Link>
        <Link to={PATHS.EMPLOYEES} className="linkB">
          Show Employees
        </Link>
      </div>
    </div>
  );
}

export default AssignEmployees;
