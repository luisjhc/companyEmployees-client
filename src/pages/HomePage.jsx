import React from "react";
import axios from "axios";
import * as CONSTS from "../utils/consts";
import LoadingComponent from "../components/Loading";
import "./pagesCss/homePage.css";
// import "../App.css";

function HomePage(props) {
  const { user } = props;

  const [success, setSuccess] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [form, setForm] = React.useState({
    number: "5",
  });

  const { number } = form;

  function handleInputChange(event) {
    const { name, value } = event.target;
    return setForm({ ...form, [name]: value });
  }

  function handleFormSubmission(event) {
    event.preventDefault();
    const choosenNumber = {
      number,
    };

    // MAKING THE REQUEST TO BACK-END SENDING THE PARAMETERS FROM THE FORM 👇

    axios
      .post(`${CONSTS.SERVER_URL}/home`, choosenNumber, {
        headers: {
          authorization: localStorage.getItem(CONSTS.ACCESS_TOKEN),
        },
      })
      .then((response) => {
        setSuccess(response.data.message);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleButton() {
    setIsLoading(true);
  }
  return (
    <div className="home_container">
      <h2>Welcome {user.username}</h2>
      <h3>
        First of all, select how many employees and companies you want to fill
        the database with.
      </h3>
      <form onSubmit={handleFormSubmission} className="home_container">
        <label htmlFor="number">Number of Employees and Companies: </label>
        <select id="number" name="number" onChange={handleInputChange}>
          <option value="5">5</option>
          <option value="10">10</option>
        </select>

        <button
          className="home-submit-btn"
          type="submit"
          onClick={handleButton}
        >
          Submit
        </button>
      </form>
      {isLoading ? (
        <div>
          <h1>Requesting data</h1>
          <LoadingComponent />
        </div>
      ) : (
        <>
          {success ? (
            <>
              {success}
              <br />
              {
                " Now you can manage companies and employees in the Manager page"
              }
            </>
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
}

export default HomePage;
