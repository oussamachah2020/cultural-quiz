import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { addDoc, collection } from "firebase/firestore";
import { checkmarkCircle } from "ionicons/icons";
import { useHistory, useLocation } from "react-router-dom";
import { db } from "../firebase";
import getRandomHotelInCity from "../hotels/getRandomHotelInCity";

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
  const postTrip = async () => {
    const hotel = getRandomHotelInCity(selectedCity);

    await addDoc(collection(db, "trips"), {
      percent: scorePercentage,
      hotelName: hotel?.name,
      ...hotel,
    });
  };
  if (scorePercentage && scorePercentage >= 80) {
    postTrip();
  }

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
        <h2>Your score: {score}</h2>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ position: "relative" }}>
            <IonIcon
              icon={checkmarkCircle}
              style={{
                fontSize: "120px",
                color:
                  scorePercentage >= 80
                    ? "var(--ion-color-success)"
                    : "var(--ion-color-danger)",
              }}
            />

            <h2>{scorePercentage}%</h2>
          </div>
        </div>
        {scorePercentage >= 80 ? (
          <h2 style={{ color: "var(--ion-color-success)", marginTop: "20px" }}>
            Congratulations! You won!
          </h2>
        ) : (
          <>
            <h2 style={{ marginTop: "20px" }}>
              Sorry, you didn't pass the quiz.
            </h2>
            <IonButton
              onClick={handleRetakeQuizClick}
              style={{ marginTop: "20px" }}
            >
              Retake Quiz
            </IonButton>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default QuizResults;
