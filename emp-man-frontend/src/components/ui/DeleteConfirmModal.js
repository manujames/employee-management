import classes from './DeleteConfirmModal.module.css'

function DeleteConfirmModal(props) {
  return (
    <div className={classes.modal}>
      <p>Are you sure to delete this employee?</p>
      <button className={classes.btn} onClick={props.onCancel}>No</button>
      <button className={classes.btn} onClick={props.onConfirm}>Yes</button>
    </div>
  );
}

export default DeleteConfirmModal;