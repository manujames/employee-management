import { NavLink } from "react-router-dom";
import Backdrop from "../ui/Backdrop";
import classes from "./MobileNavigation.module.css";

// Side navigation bar with a backdrop for small screens
function MobileNavigation(props) {
  return (
    <div className={classes.mobNav}>
      <header className={classes.header}>
        <nav>
          <ul className={classes.mobileMenu}>
            <li>
              <NavLink
                onClick={props.onLinkClick}
                exact
                to="/"
                activeClassName={classes.selected}
              >
                All Employees
              </NavLink>
            </li>

            <li>
              <NavLink
                onClick={props.onLinkClick}
                exact
                to="/add-employee"
                activeClassName={classes.selected}
              >
                Add Employee
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <Backdrop onClick={props.onLinkClick} />
    </div>
  );
}

export default MobileNavigation;
