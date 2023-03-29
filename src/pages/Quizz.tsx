import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useUser } from "../context/User";
import { Geolocation } from "@capacitor/geolocation";
import Questions from "../components/Questions";

type Props = {};

const Quizz = ({}: Props) => {
  const { user, setUserCity, userCity } = useUser();
  const [refusedLocationAccess, setRefusedLocationAccess] = useState(false);

  const [startedQuizz, setStartedQuizz] = useState(false);
  const [canUserAnswer, setCanUserAnswer] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const [allowedCities, setAllowedCities] = useState([
    "Meknes",
    "Rabat",
    "Oujda",
  ]);

  useEffect(() => {
    console.log("selected city", selectedCity);
  }, [selectedCity]);
  const handleCityChange = (event: CustomEvent) => {
    setSelectedCity(event.detail.value);
  };
  const getUserCity = async () => {
    try {
      const { coords } = await Geolocation.getCurrentPosition();
      const { latitude, longitude } = coords;

      const API_KEY = "AIzaSyDd8TBDmJQLW1K_1ZdNqw852-1cDI0t1LI";
      // Use a reverse geocoding API to get the user's city from their location
      const geocodingApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`;
      const response = await fetch(geocodingApiUrl);
      const data = await response.json();

      console.log("api data", data);

      const city = allowedCities.find((c) =>
        data.results[0].address_components
          .map((e: any) => e.long_name.toLowerCase())
          .includes(c.toLowerCase())
      );

      console.log("user city", city);

      if (city) {
        setUserCity(city);
        setCanUserAnswer(true);
        setAllowedCities((prevCities) => prevCities.filter((c) => c !== city));
      } else {
        setCanUserAnswer(false);
      }
    } catch (error) {
      console.log("catch ran");

      console.error(error);
      setRefusedLocationAccess(true);
    }
  };
  useEffect(() => {
    getUserCity();
  }, []);
  const handleEnableLocation = () => {
    setRefusedLocationAccess(false);
    getUserCity();
  };
  if (refusedLocationAccess) {
    return (
      <IonPage>
        <h1>Veuillez activer le GPS et réessayer</h1>
        <IonButton onClick={handleEnableLocation}>Réessayer</IonButton>
      </IonPage>
    );
  }
  if (!userCity) {
    return (
      <IonPage>
        <p className="my-unique-class">Loading city...</p>{" "}
      </IonPage>
    );
  }

  if (!canUserAnswer) {
    return (
      <IonPage>
        You currently live in {userCity} which is not meknes, oujda or rabat, so
        you cant answer our quizz
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Bienvenue au quiz de la ville !</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {startedQuizz ? (
          <Questions
            selectedCity={selectedCity}
            setStartedQuizz={setStartedQuizz}
          />
        ) : (
          <IonCard className="quiz-card">
            <IonCardHeader>
              <IonCardTitle>
                Répondez à 80% des questions et vous obtenez des vacances dans
                la ville de votre choix
              </IonCardTitle>
            </IonCardHeader>

            <IonCardContent className="ion-margin-bottom">
              <h4>
                Choisissez la ville dans laquelle vous souhaitez répondre aux
                questions:
              </h4>
              <IonList>
                <IonRadioGroup
                  value={selectedCity}
                  onIonChange={handleCityChange}
                >
                  {allowedCities.map((city, idx) => (
                    <IonItem key={idx}>
                      <IonLabel>{city}</IonLabel>
                      <IonRadio slot="end" value={city}></IonRadio>
                    </IonItem>
                  ))}
                </IonRadioGroup>
              </IonList>

              <IonButton
                className="ion-margin-top"
                expand="block"
                disabled={selectedCity ? false : true}
                onClick={() => setStartedQuizz(true)}
              >
                Démarrer le questionnaire
              </IonButton>
            </IonCardContent>
          </IonCard>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Quizz;
