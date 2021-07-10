import { Route, Switch } from "react-router-dom";

import EmployeesPage from './pages/Employees';
import AddEmployeePage from './pages/AddEmployee';
import Layout from "./components/layout/Layout";
import EditEmployeesPage from "./pages/EditEmployee";

function App() {
  return (
    <Layout>
      {/* This switch handles routing. Page selected by switch will be shown under MainNavigation in layout */}
      <Switch>
        <Route path="/" exact><EmployeesPage /></Route>
        <Route path="/add-employee" exact><AddEmployeePage /></Route>
        <Route path="/edit-employee/:id" exact><EditEmployeesPage /></Route>
      </Switch>
    </Layout>
  );
}

export default App;
