import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { checkmarkCircle } from "ionicons/icons";
import { useHistory, useLocation } from "react-router-dom";

const QuizResults: React.FC = () => {
  const location = useLocation<{ score: number; scorePercentage: number }>();
  const { score, scorePercentage } = location.state;
  const history = useHistory();
  const handleRetakeQuizClick = () => {
    // navigate back to the quiz page
    history.push(`/quiz`);
  };

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
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h2 style={{ margin: 0 }}>{scorePercentage}%</h2>
            </div>
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
