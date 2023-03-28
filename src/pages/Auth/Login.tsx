import { IonButton, IonInput, IonItem, IonLabel, IonList } from "@ionic/react";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, signWithGoogle } from "../../firebase";
import "./register.css";
// import "./login.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

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
  const [formData, setFormData] = useState<userData>({
    email: "",
    password: "",
  });

  const [restorationEmail, setRestorationEmail] = useState<string>("");

  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  const resetPassword = () => {
    if (!restorationEmail) {
      toast.error("Please Enter the email to send you a restoration link", {
        toastId: "error1",
      });
    }
    auth.sendPasswordResetEmail(restorationEmail).then(() => {
      toast.success(`Restoration Link has been sent to ${restorationEmail}`, {
        toastId: "success1",
      });
      setOpen(false);
    });
  };

  const currentUser = auth.currentUser;

  if (currentUser) {
    history.push("/game");
  }

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
        <p
          style={{ textDecoration: "underline", cursor: "pointer" }}
          onClick={handleOpen}
        >
          Forget You Password?
        </p>
        <IonButton type="submit" expand="block">
          Sign In
        </IonButton>
        <p>
          Don't have an account yet? <Link to={"/register"}>Sign Up</Link>
        </p>
      </form>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <p>Enter You email</p>
          <IonItem>
            <IonInput
              type="email"
              value={restorationEmail}
              onIonChange={(e: CustomEvent) => {
                setRestorationEmail((e.target as HTMLInputElement).value);
              }}
              placeholder="example@gmail.com"
            ></IonInput>
          </IonItem>
          <IonButton type="submit" expand="block" onClick={resetPassword}>
            Sign In
          </IonButton>
        </Box>
      </Modal>
      <IonButton type="submit" expand="block" onClick={signWithGoogle}>
        Sign In with google
      </IonButton>
    </div>
  );
}

export default Login;
