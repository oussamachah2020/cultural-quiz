import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Link } from "react-router-dom";
import ExploreContainer from "../components/ExploreContainer";
import "./Home.css";

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Cutlural Quiz</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="container">
          <h2>Welcome to this cultural quiz</h2>
          <p>
            Start by <Link to={"/login"}>Sign In</Link> or{" "}
            <Link to={"/register"}>Sign Up</Link>
          </p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
