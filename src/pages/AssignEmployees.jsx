import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import * as CONSTS from "../utils/consts";
import LoadingComponent from "../components/Loading";
import * as PATHS from "../utils/paths";
import EmployeesAndCompanies from "../components/Lists/EmployeesAndCompanies";

function AssignEmployees() {
  const [isLoading, setIsLoading] = React.useState(false);
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
      <Link to={PATHS.MANAGER}>Show Companies</Link>
      <Link to={PATHS.EMPLOYEES}>Show Employees</Link>
    </div>
  );
}

export default AssignEmployees;
