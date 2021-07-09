import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import EmployeeForm from "../components/emp/EmployeeForm";
import LoadingAnimation from "../components/ui/LoadingAnimation";

function EditEmployeesPage() {
  const history = useHistory();
  let { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [loadedEmployee, setLoadedEmployee] = useState({});
  const [isError, setIsError] = useState(null);

  function EditEmployeeHandler(employeeData) {
    setIsError(null);
    fetch(`http://192.168.139.61:5000/employees/edit/${id}`, {
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
        history.replace("/");
      })
      .catch((err) => {
        // Handle error here.
        setIsError(err.message);
      });
  }

  useEffect(() => {
    setIsLoading(true);
    setIsError(null);
    fetch(`http://192.168.139.61:5000/employees/edit/${id}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(response.status);
        }
      })
      .then((data) => {
        const emp = {};
        emp.name = data.name;
        emp.designation = data.designation;
        emp.email = data.email;
        emp.phone = data.phone;
        emp.address = data.address;
        setIsLoading(false);
        setLoadedEmployee(emp);
      })
      .catch((err) => {
        // Handle error here.
        setIsLoading(false);
        setIsError(err.message);
      });
  }, [id]);

  if (isLoading) {
    return (
      <section>
        <LoadingAnimation />
      </section>
    );
  }

  if(isError == 404){
    return (
      <section>
        <p>404 Error</p>
      </section>
    );
  }
  else if(isError){
    return (
      <section>
        <p>Some Other Error</p>
      </section>
    );
  }

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
