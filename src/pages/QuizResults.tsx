import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { QRCodeSVG } from "qrcode.react";

import { addDoc, collection } from "firebase/firestore";
import { checkmarkCircle, closeCircle } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useUser } from "../context/User";
import { auth, db } from "../firebase";
import getRandomHotelInCity from "../hotels/getRandomHotelInCity";
import Hotel from "../types/hotel";

const QuizResults: React.FC = () => {
  // const location = useLocation<{
  //   score: number | undefined;
  //   scorePercentage: number | undefined;
  // }>();

  const location = useLocation<any>();
  const score = location.state?.score;
  const scorePercentage = location.state?.scorePercentage;
  const selectedCity = location.state?.selectedCity;
  const history = useHistory();

  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [tripId, setTripId] = useState<string | null>(null);

  const { user } = useUser();

  useEffect(() => {
    const postTrip = async () => {
      const hotel = getRandomHotelInCity(selectedCity);
      const data = {
        percent: scorePercentage,
        hotelName: hotel?.name,
        ...hotel,
        date: new Date().toISOString(),
        user: user?.uid,
        fullName: user?.displayName,
        email: user?.email,
      };
      const doc = await addDoc(collection(db, "trips"), data);
      setTripId(doc.id);
      setHotel(hotel);
      console.log("data ", data);
    };

    if (scorePercentage && scorePercentage >= 80) {
      postTrip();
    }
  }, [scorePercentage, selectedCity]);

  const handleRetakeQuizClick = () => {
    // navigate back to the quiz page
    history.push(`/quiz`);
  };

  if (!score || !scorePercentage) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Quiz Results</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <h2 style={{ marginTop: "20px" }}>
            il semble que vous n'ayez pas encore répondu à ce quiz
          </h2>
          <IonButton
            onClick={handleRetakeQuizClick}
            style={{ marginTop: "20px" }}
          >
            Take Quiz
          </IonButton>
        </IonContent>
      </IonPage>
    );
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Quiz Results</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div
          style={{ textAlign: "center", display: "flex", alignItems: "center" }}
        >
          {scorePercentage >= 80 ? (
            <IonIcon
              icon={checkmarkCircle}
              color="success"
              style={{ fontSize: "2.5rem" }}
            />
          ) : (
            <IonIcon
              icon={closeCircle}
              color="danger"
              style={{ fontSize: "2.5rem" }}
            />
          )}
          <h2 style={{ marginInlineStart: "0.3rem", display: "inline-block" }}>
            Ton score est {score} ({scorePercentage}%)
          </h2>
        </div>
        {scorePercentage >= 80 && hotel ? (
          <>
            <h2
              style={{ color: "var(--ion-color-success)", marginTop: "20px" }}
            >
              Toutes nos félicitations! Vous avez gagné un voyage à : 
            </h2>
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>{hotel!.name}</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <p>City: {hotel!.city}</p>
                <p>
                  Coordinates: {hotel!.coordinates.lat},{" "}
                  {hotel!.coordinates.lng}
                </p>
                <p>Description: {hotel!.description}</p>
                <QRCodeSVG
                  style={{
                    display: "block",
                    margin: "1em auto",
                  }}
                  value={tripId || ""}
                />
                ,
              </IonCardContent>
            </IonCard>
            <p className="ion-margin-top">
              Pendant 30 jours, vous pouvez vous rendre à l'hôtel ci-dessus et y
              profiter d'un séjour de 7 jours avec 20% de réduction
            </p>
          </>
        ) : (
          <>
            <h2 style={{ marginTop: "20px" }}>
              Désolé, vous n'avez pas réussi le quiz.
            </h2>
            <IonButton
              onClick={handleRetakeQuizClick}
              style={{ marginTop: "20px" }}
            >
              Reprendre le quiz
            </IonButton>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default QuizResults;
