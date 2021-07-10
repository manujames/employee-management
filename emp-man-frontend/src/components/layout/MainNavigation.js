import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";

// Top navigation bar
function MainNavigation() {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>Employee Management</div>
      <nav>
        <ul>
          <li>
            <Link to="/">All Employees</Link>
          </li>

          <li>
            <Link to="/add-employee">Add Employee</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
