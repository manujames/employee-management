import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import EmployeeForm from "../components/emp/EmployeeForm";
import ErrorMessage from "../components/ui/ErrorMessage";
import LoadingAnimation from "../components/ui/LoadingAnimation";
import * as Constants from '../constants/constants';

function EditEmployeesPage() {
  const history = useHistory();
  // Get employee id from url
  let { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [loadedEmployee, setLoadedEmployee] = useState({});
  const [isError, setIsError] = useState(null);
  const [isReloadRequired, setIsReloadRequired] = useState(true); // Set it true for the first time loading

  // Called when button on not found error message is clicked
  // Redirect to home page
  function notFoundErrorHandler() {
    history.replace("/");
  }

  // Called when retry button on other error messages is clicked
  // It will set isReloadRequired state and details of the specified employee id will be fetechd again
  function otherErrorHandler() {
    setIsReloadRequired(true); // set this dependency to reload page content
  }

  // This useEffect will be executed everytime when isReaload required state or id changes
  // It will fetch details of specified user id only if(isReloadRequired == true)
  useEffect(() => {
    if (isReloadRequired) {
      setIsLoading(true);
      setIsError(null);
      fetch(`${Constants.API}/employees/edit/${id}`)
        .then((response) => {
          // Parse and return json response if api request is successfull
          // Throw error status code if api request failed
          if (response.ok) {
            return response.json();
          } else {
            throw new Error(response.status);
          }
        })
        .then((data) => {
          // Store received data in loadedEmployee
          const emp = {};
          emp.name = data.name;
          emp.designation = data.designation;
          emp.email = data.email;
          emp.phone = data.phone;
          emp.address = data.address;
          setIsLoading(false);
          setIsReloadRequired(false);
          setLoadedEmployee(emp);
        })
        .catch((err) => {
          // Handle error here.
          setIsLoading(false);
          setIsReloadRequired(false);
          setIsError(err.message);
        });
    }
  }, [id, isReloadRequired]);

  // Called when user clicks on save button in employee form
  // Send api request to update existing employee
  // If any error occures while saving, 
  // isError state will be set and error message will be displayed
  // On successful save user will be redirected to home page
  function EditEmployeeHandler(employeeData) {
    setIsError(null);
    setIsLoading(true);
    fetch(`${Constants.API}/employees/edit/${id}`, {
      method: "PUT",
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
        setIsLoading(false);
        history.replace("/");
      })
      .catch((err) => {
        // Handle error here.
        setIsLoading(false);
        setIsError(err.message);
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
  if (isError === "404") {
    return (
      <ErrorMessage
        errorMessage="Employee not found."
        button="List Employees"
        onButtonClick={notFoundErrorHandler}
      />
    );
  } else if (isError) {
    return (
      <ErrorMessage
        errorMessage="Sorry, something went wrong. Please try again later."
        button="Retry"
        onButtonClick={otherErrorHandler}
      />
    );
  }

  // If loading finished and no error
  return (
    <section>
      <h1>Edit Employee Details</h1>
      <EmployeeForm
        employee={loadedEmployee}
        onSaveEmployee={EditEmployeeHandler}
      />
    </section>
  );
}

export default EditEmployeesPage;
