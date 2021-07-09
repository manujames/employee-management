import { useState } from "react";
import { useHistory } from "react-router-dom";
import EmployeeForm from "../components/emp/EmployeeForm";

function AddEmployeesPage() {
  const history = useHistory();
  const [isError, setIsError] = useState(null);

  function AddEmployeeHandler(employeeData) {
    setIsError(null);
    fetch("http://192.168.139.61:5000/employees", {
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
        history.replace("/");
      })
      .catch((err) => {
        // Handle error here.
        setIsError(err.message);
      });
  }

  if(isError){
    return (
      <section>
        <p>Error</p>
      </section>
    );
  }

  return (
    <section>
      <h1>Add New Employee</h1>
      <EmployeeForm onSaveEmployee={AddEmployeeHandler} />
    </section>
  );
}

export default AddEmployeesPage;
