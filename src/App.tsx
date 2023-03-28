import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Auth/Login";
import Quizz from "./pages/Quizz";
import PrivateRoute from "./components/PrivateRoute";
import QuizResults from "./pages/QuizResults";
import { useUser } from "./context/User";

setupIonicReact();

const App: React.FC = () => {
  const { user } = useUser();
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          {/* public routes */}
          <Route
            exact
            path="/"
            render={() => (user ? <Redirect to="/quiz" /> : <Home />)}
          />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />

          {/* private routes */}
          <PrivateRoute exact path="/quiz" component={Quizz}></PrivateRoute>
          <PrivateRoute
            exact
            path="/quiz/results"
            component={QuizResults}
          ></PrivateRoute>
        </IonRouterOutlet>
        <ToastContainer />
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
