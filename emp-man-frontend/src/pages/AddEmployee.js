import { useState } from "react";
import { useHistory } from "react-router-dom";
import EmployeeForm from "../components/emp/EmployeeForm";
import ErrorMessage from "../components/ui/ErrorMessage";
import LoadingAnimation from "../components/ui/LoadingAnimation";
import * as Constants from '../constants/constants';

function AddEmployeesPage() {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [storedEmployeeData, setStoredEmployeeData] = useState(null);

  // Called when user clicks on retry button in error message
  // It clears error state and employee form with 
  // previously stored employee data from user input will be displayed 
  function errorMessageHandler() {
    setIsError(null);
  }

  // Called when user clicks on save button in employee form
  // Send api request to add new employee
  // If any error occures while saving, 
  // enteted employee data and isError state will be set and error message will be displayed
  // On successful save user will be redirected to home page
  function AddEmployeeHandler(employeeData) {
    setIsError(null);
    setIsLoading(true);
    fetch(`${Constants.API}/employees`, {
      method: "POST",
      body: JSON.stringify(employeeData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(response.status);
        }
      })
      .then((data) => {
        setStoredEmployeeData(null);
        setIsLoading(false);
        history.replace("/");
      })
      .catch((err) => {
        // Handle error here.
        setIsError(err.message);
        setIsLoading(false);
        setStoredEmployeeData(employeeData);
      });
  }

  // Loading animation
  if (isLoading) {
    return (
      <section>
        <LoadingAnimation />
      </section>
    );
  }

  // Error messages
  if (isError) {
    return (
      <ErrorMessage
        errorMessage="Sorry, something went wrong. Please try again later."
        button="Retry"
        onButtonClick={errorMessageHandler}
      />
    );
  }

  // If loading finished and no error
  return (
    <section>
      <h1>Add New Employee</h1>
      <EmployeeForm
        employee={storedEmployeeData}
        onSaveEmployee={AddEmployeeHandler}
      />
    </section>
  );
}

export default AddEmployeesPage;
