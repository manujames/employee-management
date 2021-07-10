import { useState } from "react";
import { Link } from "react-router-dom";
import Backdrop from "../ui/Backdrop";
import Card from "../ui/Card";
import DeleteConfirmModal from "../ui/DeleteConfirmModal";
import classes from "./Employee.module.css";
import * as Constants from '../../constants/constants';

function Employee(props) {
  const [isModalOpen, setModalView] = useState(false);

  // This function is called when user clicks delete button
  function deleteHandler() {
    setModalView(true);
  }

  // This function will close delete confirmation modal
  // Called when user clicks on no button or anywhare in the backdrop
  function closeModalHandler() {
    setModalView(false);
  }

  // This function is called when user clicks yes button (confirm delete) in modal
  // This will send api request to delete employee
  // On successful deletion or error afterdelete handler passed
  // from main employees page will be called
  function confirmDeleteHandler() {
    fetch(`${Constants.API}/employees/delete/${props.id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(response.status);
        }
      })
      .then((data) => {
        setModalView(false);
        props.afterDelete();
      })
      .catch((err) => {
        // Handle error here.
        setModalView(false);
        props.afterDelete(err.message);
      });
  }

  // Render an employee in li tag
  // This component is used multiple times 
  // in EmployeeList component to display all employees
  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.content}>
          <h3>{props.name}</h3>
          <p>
            Designation: {props.designation}
            <br />
            Email: {props.email}
            <br />
            Phone: {props.phone}
            <br />
            Address: {props.address}
          </p>
        </div>
        <div className={classes.actions}>
          <Link to={`/edit-employee/${props.id}`}>
            <button>Edit</button>
          </Link>
          <button onClick={deleteHandler}>Delete</button>
        </div>
        {/* Delete Comfirmation Modal and Backdrop */}
        {isModalOpen && (
          <DeleteConfirmModal
            onCancel={closeModalHandler}
            onConfirm={confirmDeleteHandler}
          />
        )}
        {isModalOpen && <Backdrop onClick={closeModalHandler} />}
      </Card>
    </li>
  );
}

export default Employee;
