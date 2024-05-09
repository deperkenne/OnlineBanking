import React, {
  useState,
  useContext,
  createContext,
  
} from "react";


const HeaderHomeContext = createContext();

export const HeaderHomeProvider = ({ children }) => {
  const [changestatus, setChangestatus] = useState(true);

  const handlerClic = function (changestatus2) {
    setChangestatus(changestatus2);
  };

  return (
    <HeaderHomeContext.Provider value={{ handlerClic, changestatus }}>
      {children}
    </HeaderHomeContext.Provider>
  );
};

export const useStatus = () => useContext(HeaderHomeContext);

