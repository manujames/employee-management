import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import EmployeeList from "../components/emp/EmployeeList";
import ErrorMessage from "../components/ui/ErrorMessage";
import LoadingAnimation from "../components/ui/LoadingAnimation";
import * as Constants from '../constants/constants';

function EmployeesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedEmployees, setLoadedEmployees] = useState([]);
  const [isReloadRequired, setIsReloadRequired] = useState(true); // Set it true for the first time loading
  const [isError, setIsError] = useState(null);
  const history = useHistory();

  // useEffect will be executed everytime when isReloadRequired value changes.
  // Fetch contents only if(isReloadRequired == true)
  useEffect(() => {
    if (isReloadRequired) {
      setIsLoading(true);
      setIsError(null);
      fetch(`${Constants.API}/employees`)
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
          // Store received data in loadedEmployees
          setIsLoading(false);
          setIsReloadRequired(false);
          setLoadedEmployees(data);
        })
        .catch((err) => {
          // Handle error here.
          setIsLoading(false);
          setIsReloadRequired(false);
          setIsError(err.message);
        });
    }
  }, [isReloadRequired]);

  // This function will be executed after deleting an employee 
  // by clicking confirmation button in delete confirm popup
  // If no error, it will set isReloadRequired true and then 
  // useEffect() will be executed and reload content
  // If error, it will set error state and display appropriate error message
  function afterDeleteHandler(err) {
    if (!err) {
      setIsReloadRequired(true); // set true when data changed
    } else {
      setIsError(err);
    }
  }

  // Called when button on not found error message is clicked
  function notFoundErrorHandler() {
    setIsReloadRequired(true); // set this dependency to reload page content
  }

  // Called when button on other error messages is clicked 
  function otherErrorHandler() {
    setIsReloadRequired(true); // set this dependency to reload page content
  }

  // Called when add employee button on no employees found message is clicked
  function addEmpButtonHandler() {
    history.push("/add-employee");
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
  if (isError === "404") {    // Not found error
    return (
      <ErrorMessage
        errorMessage="Employee not found."
        button="List Employees"
        onButtonClick={notFoundErrorHandler}
      />
    );
  } else if (isError) {     // Other errors
    return (
      <ErrorMessage
        errorMessage="Sorry, something went wrong. Please try again later."
        button="Reload Contents"
        onButtonClick={otherErrorHandler}
      />
    );
  }

  // If no employee details found in database
  if (loadedEmployees.length === 0) {
    return (
      <ErrorMessage
        errorMessage="No employee records found."
        button="Add Employee"
        onButtonClick={addEmpButtonHandler}
      />
    );
  }

  // If loading finished and no error
  return (
    <section>
      <h1>All Employees</h1>
      <EmployeeList
        employees={loadedEmployees}
        afterDelete={afterDeleteHandler}
      />
    </section>
  );
}

export default EmployeesPage;
