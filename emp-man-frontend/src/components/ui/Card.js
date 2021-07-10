import classes from "./Card.module.css";

// Provides drop shadows and card layout
function Card(props) {
  return (
    <div className={classes.card}>
      {props.children}
      </div>
  );
}

export default Card;
