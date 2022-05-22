import React from "react";
import axios from "axios";
import * as CONSTS from "../../utils/consts";
import LoadingComponent from "../../components/Loading";

function EmployeesAndCompanies({ employeesNotAssigned }) {
  const [form, setForm] = React.useState({
    employee: "",
    company: "",
  });
  const { employee, company } = form;

  const [isLoading, setIsLoading] = React.useState(false);
  // const [success, setSuccess] = useState("");
  const [companiesWithNoEmployees, setcompaniesWithNoEmployees] =
    React.useState([]);

  React.useEffect(() => {
    axios
      .get(`${CONSTS.SERVER_URL}/employees/companiesWithNoEmployees`, {
        headers: {
          authorization: localStorage.getItem(CONSTS.ACCESS_TOKEN),
        },
      })
      .then((response) => {
        // console.log("response:", response.data);
        return setcompaniesWithNoEmployees(response.data);
      })
      .catch((err) => {
        console.log("err:", err);
      });
  }, []);

  function handleInputChange(event) {
    const { name, value } = event.target;
    return setForm({ ...form, [name]: value });
  }

  function handleFormSubmission() {
    // event.preventDefault();
    const selection = { employee, company };
    axios
      .post(`${CONSTS.SERVER_URL}/employees/assign`, selection, {
        headers: {
          authorization: localStorage.getItem(CONSTS.ACCESS_TOKEN),
        },
      })
      .then((response) => {
        setIsLoading(false);
        // console.log("response:", response.data);
        // return setSuccess(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setForm({
      employee: "",
      company: "",
    });
  }

  return (
    <>
      {isLoading ? (
        <div>
          <h1>Requesting data</h1>
          <LoadingComponent />
        </div>
      ) : (
        <>
          <h2>List of employees that can be assigned</h2>
          <p>
            Please click on the name of the employee and the company to be
            assigned, then press Submit
          </p>
          {employeesNotAssigned.map((employee) => (
            <div key={employee._id}>
              <ul>
                <li>
                  <h3>
                    {employee.first_name} {employee.last_name}
                  </h3>
                </li>
                <li>Email: {employee.email}</li>
                <li>Date of Birth: {employee.date_of_birth}</li>
                <form onSubmit={handleFormSubmission}>
                  <li>
                    <label htmlFor="employee">
                      Name: {employee.first_name}
                    </label>
                    <input
                      name="employee"
                      id={employee.first_name}
                      type="radio"
                      value={employee.first_name}
                      onChange={handleInputChange}
                    />
                  </li>
                  <p>Companies:</p>
                  {companiesWithNoEmployees.map((company) => (
                    <div key={company._id}>
                      <li>
                        <label htmlFor="company">{company.business_name}</label>
                        <input
                          name="company"
                          id={company.business_name}
                          type="radio"
                          value={company.business_name}
                          onChange={handleInputChange}
                        />
                      </li>
                    </div>
                  ))}
                  <button type="submit">Submit</button>
                </form>
              </ul>
            </div>
          ))}
        </>
      )}
    </>
  );
}

export default EmployeesAndCompanies;
