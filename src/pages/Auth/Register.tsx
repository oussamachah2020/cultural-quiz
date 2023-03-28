import {
  IonButton,
  IonFooter,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { useUser } from "../../context/User";
import { auth, db } from "../../firebase";
import "./register.css";

type Props = {};

interface userData {
  fullName: string;
  email: string;
  password: string;
  password2: string;
}

function Register({}: Props) {
  const [formData, setFormData] = useState<userData>({
    fullName: "",
    email: "",
    password: "",
    password2: "",
  });

  const [loading, setLoading] = useState(false);
  const { setUser } = useUser();
  const history = useHistory();

  const signUp = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    const { fullName, email, password, password2 } = formData;
    if (!fullName.includes(" "))
      return toast.error("Veuillez fournir le nom complet", {
        toastId: "error1",
      });
    if (password !== password2)
      return toast.error("Les mots de passe ne correspondent pas", {
        toastId: "error1",
      });
    try {
      setLoading(true);
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(auth.currentUser!, {
        displayName: fullName,
      });
      setUser(user);
      console.log("useeer", user);
      await addDoc(collection(db, "users"), {
        fullName,
        email,
      });
      toast.success("Inscription réussie, vous rediriger maintenant...", {
        autoClose: 2000,
      });

      setTimeout(() => {
        history.push("/quiz");
      }, 2002);
    } catch (error: any) {
      setLoading(false);

      switch (error.code) {
        case "auth/email-already-in-use":
          toast.error("Cet email est deja utilisé par un autre ultilisateur");
          break;
        case "auth/invalid-email":
          toast.error("Cette email n'est pas valide");
          break;
        case "auth/operation-not-allowed":
          toast.error("Opération non autorisée");
          break;
        case "auth/weak-password":
          toast.error("Le mot de passe est trop faible.");
          break;
        default:
          toast.error("Something went wrong");
          break;
      }
    }
  };

  return (
    <IonPage>
      <form className="registration-form" onSubmit={signUp}>
        <h2>Sign Up</h2>
        <IonList>
          <IonItem>
            <IonLabel position="floating">Nom et prénom</IonLabel>
            <IonInput
              value={formData.fullName}
              onIonChange={(e: CustomEvent) => {
                setFormData((prevData) => ({
                  ...prevData,
                  fullName: (e.target as HTMLInputElement).value,
                }));
              }}
            ></IonInput>
          </IonItem>
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
          <IonItem>
            <IonLabel position="floating">Confirmez le mot de passe</IonLabel>
            <IonInput
              type="password"
              value={formData.password2}
              onIonChange={(e: CustomEvent) => {
                setFormData((prevData) => ({
                  ...prevData,
                  password2: (e.target as HTMLInputElement).value,
                }));
              }}
            ></IonInput>
          </IonItem>
        </IonList>
        <IonButton disabled={loading} type="submit" expand="block">
          {loading ? <IonSpinner name="crescent"></IonSpinner> : "Sign Up"}
        </IonButton>
      </form>
      <IonFooter>
        <IonToolbar>
          <IonTitle>
            Vous avez déjà un compte?
            <br /> <Link to={"/login"}>Se connecter</Link>
          </IonTitle>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
}

export default Register;
