import classes from "./Layout.module.css";
import MainNavigation from "./MainNavigation";

// Set layout
// MainNavigation on top and content passed 
// from parent component below that.
function Layout(props) {
  return (
    <div>
      <MainNavigation />
      <main className={classes.main}>{props.children}</main>
    </div>
  );
}

export default Layout;
