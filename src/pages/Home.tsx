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
          <IonTitle>Cultural Quiz</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="container">
          <h2>Bienvenue à ce quiz culturel</h2>
          <p style={{ textAlign: "center" }}>
            Commencez par <Link to={"/login"}>vous connecter</Link> ou
            <Link to={"/register"}> vous inscrire</Link> pour tenter de gagner
            un voyage dans un hôtel aléatoire dans la ville de votre choix.
          </p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
