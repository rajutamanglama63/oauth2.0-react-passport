import { ReactNode, createContext, useEffect, useState } from "react";
import { getOauthUser } from "../services/oauthuser";

export const OathContext = createContext({});

export const OathContextProvider = (props: { children: ReactNode }) => {
  const [userData, setUserData] = useState<any>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getOauthUser();
        console.log("user from context: ", data);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <OathContext.Provider value={userData}>
      {props.children}
    </OathContext.Provider>
  );
};
