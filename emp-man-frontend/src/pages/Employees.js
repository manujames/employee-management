import { useEffect, useState } from "react";
import EmployeeList from "../components/emp/EmployeeList";

function EmployeesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedEmployees, setLoadedEmployees] = useState([]);
  const [isDataChanged, setIsDataChanged] = useState(true);   // Set it true for the first time loading

  useEffect(
    () => {
      if(isDataChanged){
        setIsLoading(true);
        fetch("http://192.168.139.61:5000/employees")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setIsLoading(false);
          setIsDataChanged(false);
          setLoadedEmployees(data);
        });
      }
    },[isDataChanged]
  );

  function afterDeleteHandler(){
    setIsDataChanged(true);       // set true when data changed
  }

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <section>
      <h1>All Employees</h1>
      <EmployeeList employees={loadedEmployees} afterDelete={afterDeleteHandler} />
    </section>
  );
}

export default EmployeesPage;
