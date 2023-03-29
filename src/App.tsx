import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import Register from "./pages/Auth/Register";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Auth/Login";
import Quizz from "./pages/Quizz";
import PrivateRoute from "./components/PrivateRoute";
import QuizResults from "./pages/QuizResults";
import { useUser } from "./context/User";
import { home, qrCode, person } from "ionicons/icons";
import Scanner from "./pages/Scanner";
// import "./theme/globals.css";
import Profile from "./pages/Profile";
import { useEffect } from "react";
setupIonicReact();

const App: React.FC = () => {
  const { user } = useUser();

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            {/* public routes */}
            <Route
              exact
              path="/home"
              render={() => (user ? <Redirect to="/quiz" /> : <Home />)}
            />
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <Route exact path="/register" render={() => <Register />} />
            <Route exact path="/login" render={() => <Login />} />

            {/* private routes */}
            <PrivateRoute exact path="/quiz" component={Quizz}></PrivateRoute>
            <PrivateRoute
              exact
              path="/quiz/results"
              component={QuizResults}
            ></PrivateRoute>
            <PrivateRoute
              exact
              path="/profile"
              component={Profile}
            ></PrivateRoute>

            <Route exact={true} path="/scanner" component={Scanner}></Route>
          </IonRouterOutlet>

          <IonTabBar slot="bottom">
            <IonTabButton tab="home" href="/home">
              <IonIcon icon={home} />
            </IonTabButton>

            <IonTabButton tab="scanner" href="/scanner">
              <IonIcon icon={qrCode} />
            </IonTabButton>

            <IonTabButton tab="profile" href="/profile">
              <IonIcon icon={person} />
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
