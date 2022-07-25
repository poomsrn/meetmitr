import React, { createContext, useState, useContext } from "react";

const UserInfoContext = createContext({
  state: {} as any,
  setState: {} as any,
});

const UserInfoProvider = ({
  children,
  value = {
    bio: "",
    birthdate: "2001-02-05T00:00:00.000Z",
    email: "meetmitr@meetmitr.com",
    firstName: "meetmitr",
    gender: "male",
    hideGender: 0,
    lastName: "meetmitr",
    middleName: "",
    numberOfPenalty: 0,
    password: "$2b$10$VdDWGw5lszl6Fcs.L2jabeOmRrx4dMlNO/IC35A3xWoU.ojkEaMMG",
    phoneNo: "",
    profileName: "profileName",
    userId: "d8b6026c-9e1d-46a0-98a3-e6f750d6f75d",
  } as any,
}: {
  children: React.ReactNode;
  value?: any;
}) => {
  const [state, setState] = useState(value);
  return (
    <UserInfoContext.Provider value={{ state, setState }}>
      {children}
    </UserInfoContext.Provider>
  );
};

const useUserInfo = () => {
  const context = useContext(UserInfoContext);
  if (!context) {
    throw new Error("useUserInfo must be used within a UserInfoContext");
  }
  return context;
};

export { UserInfoProvider, useUserInfo };
