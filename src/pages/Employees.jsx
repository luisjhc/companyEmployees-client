import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import * as CONSTS from "../utils/consts";
import LoadingComponent from "../components/Loading";
import * as PATHS from "../utils/paths";
import "./pagesCss/employees.css";

function Employees() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [listOfEmployees, setListOfEmployees] = React.useState([]);
  const [listOfFilteredEmployees, setListOfFilteredEmployees] = React.useState(
    []
  );
  const [checked, setChecked] = React.useState(false);

  React.useEffect(() => {
    axios
      .get(`${CONSTS.SERVER_URL}/employees`, {
        headers: {
          authorization: localStorage.getItem(CONSTS.ACCESS_TOKEN),
        },
      })
      .then((response) => {
        setIsLoading(false);
        // console.log("response:", response.data);
        return setListOfEmployees(response.data);
      })
      .catch((err) => {
        console.log("err:", err);
      });
  }, []);

  function employeesNotAssigned() {
    setChecked(true);
    axios
      .get(`${CONSTS.SERVER_URL}/employees/employeesNotAssigned`, {
        headers: {
          authorization: localStorage.getItem(CONSTS.ACCESS_TOKEN),
        },
      })
      .then((response) => {
        setIsLoading(false);
        // console.log("response:", response.data);
        return setListOfFilteredEmployees(response.data);
      })
      .catch((err) => {
        console.log("err:", err);
      });
  }

  function allEmployees() {
    setChecked(false);
  }

  return (
    <div>
      {isLoading ? (
        <div>
          <h1>Requesting data</h1>
          <LoadingComponent />
        </div>
      ) : (
        <div className="employees_container">
          {checked ? (
            <h2>Employees not yet assigned</h2>
          ) : (
            <h2>Complete List of Employees</h2>
          )}
          <button
            onClick={() => employeesNotAssigned()}
            className="employees_btnA"
          >
            Show only unassigned employees
          </button>
          <button onClick={() => allEmployees()} className="employees_btnB">
            Show all employees
          </button>
          {checked
            ? listOfFilteredEmployees.map((employee) => (
                <div key={employee._id}>
                  <ul className="employees_ul">
                    <li>
                      <h3>
                        {employee.first_name} {employee.last_name}
                      </h3>
                      <ul>
                        <li>Email: {employee.email}</li>
                        <li>Date of Birth: {employee.date_of_birth}</li>
                        <li>Company: {employee.company}</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              ))
            : listOfEmployees.map((employee) => (
                <div key={employee._id}>
                  <ul className="employees_ul">
                    <li>
                      <h3>
                        {employee.first_name} {employee.last_name}
                      </h3>
                      <ul>
                        <li>Email: {employee.email}</li>
                        <li>Date of Birth: {employee.date_of_birth}</li>
                        <li>Company: {employee.company}</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              ))}
        </div>
      )}
      <div className="links">
        <Link to={PATHS.MANAGER} className="linkA">
          Show Companies
        </Link>
        <Link to={PATHS.ASSIGNEMPLOYEES} className="linkB">
          Assign Employees
        </Link>
      </div>
    </div>
  );
}

export default Employees;
