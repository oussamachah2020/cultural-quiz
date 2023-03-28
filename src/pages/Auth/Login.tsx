import {
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { useUser } from "../../context/User";
import { auth } from "../../firebase";
import "./register.css";
// import "./login.css";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#fff",
  border: "2px solid #000",
  borderRadius: "10px",
  color: "#000",
  boxShadow: 24,
  p: 4,
};

type Props = {};

interface userData {
  email: string;
  password: string;
}

function Login({}: Props) {
  const { setUser } = useUser();
  const [formData, setFormData] = useState<userData>({
    email: "",
    password: "",
  });

  const [restorationEmail, setRestorationEmail] = useState<string>("");

  const [isSigningIn, setIsSigningIn] = useState(false);

  // ionic modal
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);

  function confirm() {
    modal.current?.dismiss(input.current?.value, "confirm");
  }

  // end of ionic modal

  const history = useHistory();

  const signIn = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      return toast.error("Veuillez remplir les deux entrées");
    }
    try {
      setIsSigningIn(true);
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      setUser(user);

      console.log("useeer", user);

      toast.success("Login réussie, vous rediriger maintenant...", {
        autoClose: 2000,
      });
      setTimeout(() => history.push("/quiz"), 2002);
    } catch (error: any) {
      setIsSigningIn(false);

      switch (error.code) {
        case "auth/wrong-password":
          toast.error("Mot de passe incorrect");
          break;
        case "auth/user-not-found":
          toast.error("Aucun utilisateur n'existe avec cet e-mail");
          break;

        default:
          toast.error("Quelque chose s'est mal passé");
          break;
      }
      console.log(error);
    }
  };

  const resetPassword = async () => {
    if (!restorationEmail) return;
    try {
      await sendPasswordResetEmail(auth, restorationEmail);
      confirm();
      toast.success(
        `Le lien de restauration a été envoyé à ${restorationEmail}`
      );
    } catch (error: any) {
      confirm();
      if (error.code == "auth/user-not-found")
        return toast.error("Aucun utilisateur n'existe avec cet e-mail");
      toast.error("Quelque chose s'est mal passé, réessayez plus tard");
    }
  };

  return (
    <IonPage>
      <form className="registration-form" onSubmit={signIn}>
        <h2>Sign In</h2>
        <IonList>
          <IonItem>
            <IonLabel position="floating">E-mail</IonLabel>
            <IonInput
              value={formData.email}
              onIonChange={(e: CustomEvent) => {
                setFormData((prevData) => ({
                  ...prevData,
                  email: (e.target as HTMLInputElement).value,
                }));
              }}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Password</IonLabel>
            <IonInput
              type="password"
              value={formData.password}
              onIonChange={(e: CustomEvent) => {
                setFormData((prevData) => ({
                  ...prevData,
                  password: (e.target as HTMLInputElement).value,
                }));
              }}
            ></IonInput>
          </IonItem>
        </IonList>
        <p
          id="open-modal"
          style={{ textDecoration: "underline", cursor: "pointer" }}
        >
          Mot de passe oublié?
        </p>
        <IonButton disabled={isSigningIn} type="submit" expand="block">
          {isSigningIn ? (
            <IonSpinner name="crescent"></IonSpinner>
          ) : (
            "Se connecter"
          )}
        </IonButton>
      </form>
      <IonModal ref={modal} trigger="open-modal">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={() => modal.current?.dismiss()}>
                Cancel
              </IonButton>
            </IonButtons>
            <IonTitle size="small">Réinitialiser le mot de passe</IonTitle>
            <IonButtons slot="end">
              <IonButton strong={true} onClick={resetPassword}>
                Confirm
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonItem>
            <IonLabel position="floating">Email</IonLabel>
            <IonInput
              value={restorationEmail}
              onIonChange={(e: CustomEvent) => {
                setRestorationEmail((e.target as HTMLInputElement).value);
              }}
              placeholder="example@gmail.com"
            />
          </IonItem>
          <IonButton expand="block" onClick={resetPassword}>
            Réinitialiser le mot de passe
          </IonButton>
        </IonContent>
      </IonModal>
      <IonFooter>
        <IonToolbar>
          <IonTitle>
            Pas de compte? <br />
            <Link to={"/register"}>Inscription</Link>
          </IonTitle>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
}

export default Login;
