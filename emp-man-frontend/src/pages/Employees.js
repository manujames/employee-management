import { useEffect, useState } from "react";
import EmployeeList from "../components/emp/EmployeeList";
import LoadingAnimation from "../components/ui/LoadingAnimation";

function EmployeesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedEmployees, setLoadedEmployees] = useState([]);
  const [isDataChanged, setIsDataChanged] = useState(true); // Set it true for the first time loading
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    if (isDataChanged) {
      setIsLoading(true);
      setIsError(null);
      fetch("http://192.168.139.61:5000/employees")
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error(response.status);
          }
        })
        .then((data) => {
          setIsLoading(false);
          setIsDataChanged(false);
          setLoadedEmployees(data);
        })
        .catch((err) => {
          // Handle error here.
          setIsLoading(false);
          setIsDataChanged(false);
          setIsError(err.message);
        });
    }
  }, [isDataChanged]);

  function afterDeleteHandler(err) {
    if(!err){
      setIsDataChanged(true); // set true when data changed
    }
    else{
      setIsError(err);
    }
  }

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
      <h1>All Employees</h1>
      <EmployeeList
        employees={loadedEmployees}
        afterDelete={afterDeleteHandler}
      />
    </section>
  );
}

export default EmployeesPage;
