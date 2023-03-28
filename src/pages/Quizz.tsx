import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useUser } from "../context/User";
import { Geolocation } from "@capacitor/geolocation";
import Questions from "../components/Questions";

type Props = {};

const Quizz = ({}: Props) => {
  const { user, setUserCity, userCity } = useUser();
  const [refusedLocationAccess, setRefusedLocationAccess] = useState(false);

  const getUserCity = async () => {
    try {
      const { coords } = await Geolocation.getCurrentPosition();
      const { latitude, longitude } = coords;

      const API_KEY = "AIzaSyDd8TBDmJQLW1K_1ZdNqw852-1cDI0t1LI";
      // Use a reverse geocoding API to get the user's city from their location
      const geocodingApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`;
      const response = await fetch(geocodingApiUrl);
      const data = await response.json();
      const city = data.results[0].address_components[1].long_name;

      console.log("user city", city);

      if (["Rabat", "Meknes", "Oujda", "Seba Ayoun"].includes(city))
        return setUserCity(city);

      toast.error(
        `Désolé, vous ne pouvez pas répondre à notre quiz car vous n'habitez pas à Rabat, Meknès ou Oujda. Votre ville actuelle est ${city}.`,
        { autoClose: 5000 }
      );
    } catch (error) {
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
    return <IonPage>Loading city... </IonPage>;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Welcome to the {userCity} quiz!</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <Questions />
      </IonContent>
    </IonPage>
  );
};

export default Quizz;
