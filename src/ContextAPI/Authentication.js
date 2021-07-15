import React, { createContext, useState }  from 'react';
export const authContext = createContext();
  
  function useProvideAuth() {
    const [user, setUser] = useState(null);
  
    const signin = () => {
        window.location.href = '/admin'; 
    };
  
    const signout = () => {
      return (() => {
        setUser(null);
      });
    };
  
    return {
      user,
      signin,
      signout
    };
  }

function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return (
        <authContext.Provider value={auth}>
        {children}
        </authContext.Provider>
    );
}

export default ProvideAuth;