import Card from "./Card";
import classes from "./ErrorMessage.module.css";

// Display error message
// Message, button name and button action 
// are passed from parent component
function ErrorMessage(props) {
  return (
    <section className={classes.errorCard}>
      <Card>
        <p>{props.errorMessage}</p>
        <div className={classes.actions}>
          <button onClick={props.onButtonClick}>{props.button}</button>
        </div>
      </Card>
    </section>
  );
}

export default ErrorMessage;
