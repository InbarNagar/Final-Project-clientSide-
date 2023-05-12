import React, { useState,createContext} from 'react';

export const UserContext = createContext();
// export const BussinessContext = createContext();*********


export const loginHook = () => {

  const [userDetails, setUserDetails] = useState();

  return {
    userDetails,
    setUserDetails
  }
}

// export const loginHook2 = () => {************

//   const [BussinessDetails, setBussinessDetails] = useState();

//   return {
//     BussinessDetails,
//     setBussinessDetails
//   }
// }