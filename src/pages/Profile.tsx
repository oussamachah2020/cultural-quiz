import React, { useState } from "react";
import {
  IonPage,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
} from "@ionic/react";
import { useUser } from "../context/User";
import { toast } from "react-toastify";
import { signOut, updatePassword, updateProfile, User } from "@firebase/auth";
import { auth } from "../firebase";

const Profile: React.FC = () => {
  const { user, setUser } = useUser();
  const [newDisplayName, setNewDisplayName] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleDisplayNameUpdate = async () => {
    try {
      if (!newDisplayName) {
        throw new Error("Please enter a new display name");
      }
      await updateProfile(auth.currentUser!, {
        displayName: newDisplayName,
      });
      toast.success("Display name updated successfully");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handlePasswordUpdate = async () => {
    try {
      if (!newPassword) {
        throw new Error("Please enter a new password");
      }
      await updatePassword(auth.currentUser!, newPassword);
      toast.success("Password updated successfully");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      toast.success("Logged out successfully.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to log out.");
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding" style={{ margin: "20px" }}>
        <h2>{user?.displayName}!</h2>
        <p>Votre adresse e-mail est : {user?.email}</p>

        <IonItem>
          <IonLabel position="floating">Changer le nom complet</IonLabel>
          <IonInput
            type="text"
            value={newDisplayName}
            onIonChange={(e) => setNewDisplayName(e.detail.value!)}
          />
        </IonItem>
        <IonButton expand="block" onClick={handleDisplayNameUpdate}>
          Changer
        </IonButton>

        <IonItem>
          <IonLabel position="floating">Nouveau Password</IonLabel>
          <IonInput
            type="password"
            value={newPassword}
            onIonChange={(e) => setNewPassword(e.detail.value!)}
          />
        </IonItem>
        <IonButton expand="block" onClick={handlePasswordUpdate}>
          Update Password
        </IonButton>
        <IonButton
          style={{ marginTop: "40px" }}
          color="danger"
          expand="block"
          onClick={handleLogout}
        >
          Se deconnecter
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
