import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import EmployeeForm from "../components/emp/EmployeeForm";

function EditEmployeesPage() {
  const history = useHistory();
  let { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [loadedEmployee, setLoadedEmployee] = useState({});

  function EditEmployeeHandler(employeeData) {
    fetch(
      // "https://emp-man-ff443-default-rtdb.firebaseio.com/employees.json",
      `http://192.168.139.61:5000/employees/edit/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(employeeData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(() => {
      history.replace("/");
    });
  }

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://192.168.139.61:5000/employees/edit/${id}`)
      .then((response) => {
        return response.json();
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
      });
  }, [id]);

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <section>
      <h1>Edit Employee Details</h1>
      <EmployeeForm employee={loadedEmployee} onSaveEmployee={EditEmployeeHandler} />
    </section>
  );
}

export default EditEmployeesPage;
