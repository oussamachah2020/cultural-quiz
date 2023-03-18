import { IonButton, IonInput, IonItem, IonLabel, IonList } from "@ionic/react";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../../firebase";
import "./register.css";

type Props = {};

interface userData {
  username: string;
  email: string;
  password: string;
  password2: string;
}

function Register({}: Props) {
  const [formData, setFormData] = useState<userData>({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const history = useHistory();

  const signUp = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    const { username, email, password, password2 } = formData;

    if (password === password2) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((authUser) => {
          if (authUser.user) {
            return authUser?.user.updateProfile({
              displayName: username,
            });
          }

          toast.success("Sign Up successfuly", {
            toastId: "success1",
          });
          history.push("/game");
        })
        .catch((err) => {
          toast.error(err, {
            toastId: "error1",
          });
        });
    } else {
      toast.error("Passwords not matching", {
        toastId: "error1",
      });
    }
  };

  return (
    <div>
      <form className="registration-form" onSubmit={signUp}>
        <h2>Sign Up</h2>
        <IonList>
          <IonItem>
            <IonLabel>Username</IonLabel>
            <IonInput
              value={formData.username}
              onIonChange={(e: CustomEvent) => {
                setFormData((prevData) => ({
                  ...prevData,
                  username: (e.target as HTMLInputElement).value,
                }));
              }}
            ></IonInput>
          </IonItem>
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
          <IonItem>
            <IonLabel>Confirm Password</IonLabel>
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
        <IonButton type="submit" expand="block">
          Sign Up
        </IonButton>
        <p>
          Already have an account? <Link to={"/login"}>Sign in</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
