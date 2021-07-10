import classes from "./EmployeeForm.module.css";
import Card from "../ui/Card";
import { useEffect, useRef } from "react";

// This form is used for add employee and edit employee pages
function EmployeeForm(props) {
  const nameInputRef = useRef();
  const designationInputRef = useRef();
  const emailInputRef = useRef();
  const phoneInputRef = useRef();
  const addressInputRef = useRef();

  // Fill each ref's value if any values provided from parent component
  // This useEffect will be called everytime when props.employee changes
  useEffect(() => {
    nameInputRef.current.value = props.employee? props.employee.name : "";
    designationInputRef.current.value = props.employee? props.employee.designation : "";
    emailInputRef.current.value = props.employee? props.employee.email : "";
    phoneInputRef.current.value = props.employee? props.employee.phone : "";
    addressInputRef.current.value = props.employee? props.employee.address : "";
  },[props.employee]);

  // This function will be called when user clicks save button
  // Get employee data from user inputs and pass it to 
  // the parent component's Add/Edit employee handler
  function submitHandler(event) {
    event.preventDefault();

    const employeeData = {
      name: nameInputRef.current.value,
      designation: designationInputRef.current.value,
      email: emailInputRef.current.value,
      phone: phoneInputRef.current.value,
      address: addressInputRef.current.value,
    };
    props.onSaveEmployee(employeeData);
  }

  // Render employee form
  return (
    <div className={classes.formCard}>
      <Card>
        <form className={classes.form} onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              // value={props.employee && props.employee.name}
              ref={nameInputRef}
              required
            />
          </div>

          <div className={classes.control}>
            <label htmlFor="designation">Designation</label>
            <input
              type="text"
              id="designation"
              // value={props.employee && props.employee.designation}
              ref={designationInputRef}
              required
            />
          </div>

          <div className={classes.control}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              // value={props.employee && props.employee.email}
              ref={emailInputRef}
              required
            />
          </div>

          <div className={classes.control}>
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              id="phone"
              // value={props.employee && props.employee.phone}
              ref={phoneInputRef}
              required
            />
          </div>

          <div className={classes.control}>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              // value={props.employee && props.employee.address}
              ref={addressInputRef}
              required
            />
          </div>

          <div className={classes.actions}>
            <button>Save</button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default EmployeeForm;
