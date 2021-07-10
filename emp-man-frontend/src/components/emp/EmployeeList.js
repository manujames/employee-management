import classes from "./EmployeeList.module.css";
import Employee from "./Employee";

function EmployeeList(props) {
  return (
    <ul className={classes.list}>
      {/* Loop through all employees in props and list them using <Employee> component */}
      {props.employees.map((employee) => (
        <Employee
          key={employee._id}
          id={employee._id}
          name={employee.name}
          designation={employee.designation}
          email={employee.email}
          phone={employee.phone}
          address={employee.address}
          afterDelete={props.afterDelete}
        />
      ))}
    </ul>
  );
}

export default EmployeeList;
