import "antd/dist/antd.css";
import HomeScreen from "./components/HomeScreen";
import AddBooks from "./components/AddBooks";
import { AuthProvider } from "./components/AuthRoute";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "./components/Registeration";
import HeaderNav from "./components/Header";
import Profile from "./components/ProfilePage";
import PrivateDownload from "./components/PrivateDownload";

function App() {
  return (
    <div>
      <AuthProvider>
        <Router>
          <HeaderNav />
          <Switch>
            <Route exact path="/" component={HomeScreen} />
            <Route exact path="/addBooks" component={AddBooks} />
            <PrivateDownload exact path="/profile" component={Profile} />
            <Route exact path="/register" component={Register} />
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
