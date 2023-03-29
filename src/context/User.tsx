import { createContext, useContext, useEffect, useState } from "react";
import { User as FirebaseUser } from "firebase/auth";
import "firebase/auth";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

interface UserContextType {
  user: FirebaseUser | null;
  setUser: (user: FirebaseUser | null) => void;
  isLoadingUser: Boolean;
  setUserCity: (city: string) => void;
  userCity: string;
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  isLoadingUser: true,
  setUserCity: () => {},
  userCity: "",
});

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);
  const [userCity, setUserCity] = useState("");
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        console.log("useerer", user);
      }
      setIsLoadingUser(false);
    });

    return () => {
      console.log("clean up runned");

      unsubscribe();
    };
  }, []);
  const values = { user, setUser, isLoadingUser, setUserCity, userCity };
  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export default UserProvider;
