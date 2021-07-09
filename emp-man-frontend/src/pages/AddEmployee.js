import { useHistory } from "react-router-dom";
import EmployeeForm from "../components/emp/EmployeeForm";

function AddEmployeesPage() {
  const history = useHistory();

  function AddEmployeeHandler(employeeData){
    fetch(
      // "https://emp-man-ff443-default-rtdb.firebaseio.com/employees.json",
      "http://192.168.139.61:5000/employees",
      {
        method: "POST",
        body: JSON.stringify(employeeData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(() => {
      history.replace("/");
    });
  }

  return (
    <section>
      <h1>Add New Employee</h1>
      <EmployeeForm onSaveEmployee={AddEmployeeHandler} />
    </section>
  );
}

export default AddEmployeesPage;
