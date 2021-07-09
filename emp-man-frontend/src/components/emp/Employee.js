import { useState } from "react";
import { Link } from "react-router-dom";
import Backdrop from "../ui/Backdrop";
import Card from "../ui/Card";
import DeleteConfirmModal from "../ui/DeleteConfirmModal";
import classes from "./Employee.module.css";

function Employee(props) {
  const [isModalOpen, setModalView] = useState(false);

  function deleteHandler() {
    setModalView(true);
  }

  function closeModalHandler() {
    setModalView(false);
  }

  function confirmDeleteHandler() {
    fetch(`http://192.168.139.61:5000/employees/delete/${props.id}`, {
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
        // Handle error here. 404, 500
        setModalView(false);
        props.afterDelete(err.message);
      });
  }

  return (
    <li className={classes.item}>
      <Card>
        {/* <div className={classes.image}>
          <img src="person.png" alt="person" />
        </div> */}
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
