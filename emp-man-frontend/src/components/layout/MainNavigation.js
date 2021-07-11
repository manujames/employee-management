import { useState } from "react";
import { NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import MobileNavigation from "./MobileNavigation";
import { ReactComponent as CloseIcon } from "../../assets/close.svg";
import { ReactComponent as MenuIcon } from "../../assets/menu.svg";

// Top navigation bar
function MainNavigation() {
  // side navigation bar state
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle side navigation bar state on menu/close button click
  function handleMenuClick() {
    setIsMenuOpen(!isMenuOpen);
  }

  // Close side navigation bar on any link/backdrop click
  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <div>
      <header className={classes.header}>
        <div className={classes.logo}>
          {/* These icons will be displayed on small screens only */}
          {isMenuOpen ? (
            <CloseIcon
              onClick={handleMenuClick}
              className={classes.mobileMenuIcon}
            />
          ) : (
            <MenuIcon
              onClick={handleMenuClick}
              className={classes.mobileMenuIcon}
            />
          )}
          Employee Management
        </div>
        <nav>
          <ul className={classes.webMenu}>
            <li>
              <NavLink exact to="/" activeClassName={classes.selected}>
                All Employees
              </NavLink>
            </li>

            <li>
              <NavLink
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
      <div className={classes.topSpacing}></div>
      {isMenuOpen && <MobileNavigation onLinkClick={closeMenu} />}
    </div>
  );
}

export default MainNavigation;
