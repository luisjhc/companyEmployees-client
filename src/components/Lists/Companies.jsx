import React from "react";

const Companies = ({ listOfCompanies }) => {
  return (
    <div>
      <h2>Complete List of Companies</h2>
      {listOfCompanies.map((company) => (
        <div key={company._id}>
          <ul>
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
  );
};

export default Companies;
