import { IonButton, IonInput, IonItem, IonLabel, IonList } from "@ionic/react";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../../firebase";
import "./register.css";

type Props = {};

interface userData {
  email: string;
  password: string;
}

function Login({}: Props) {
  const [formData, setFormData] = useState<userData>({
    email: "",
    password: "",
  });

  const history = useHistory();

  const signIn = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      toast.error("Please enter your informations", {
        toastId: "error1",
      });
    }

    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        auth.onAuthStateChanged((user) => {
          localStorage.setItem("user", JSON.stringify(user));
        });
        history.push("/game");
      })
      .catch((err) => {
        toast(err);
      });
  };

  return (
    <div>
      <form className="registration-form" onSubmit={signIn}>
        <h2>Sign In</h2>
        <IonList>
          <IonItem>
            <IonLabel>E-mail</IonLabel>
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
            <IonLabel>Password</IonLabel>
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
        <IonButton type="submit" expand="block">
          Sign In
        </IonButton>
        <p>
          Don't have an account yet? <Link to={"/register"}>Sign Up</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
