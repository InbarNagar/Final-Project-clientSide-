import { View, Text } from 'react-native'
import React from 'react'
import { Fetch, Axios, AxiosNum } from './Fetch'

// //התחברות לקוח
// export const LogInF = (ID_number, password) => {
//     console.log(`Client/OneClient/${ID_number}/${password}`)
//     return Fetch(`Client/OneClient/${ID_number}/${password}`, 'get')
// }

//התחברות לקוח
export const LogInF = (body) => {
    return Axios(`Client/OneClient`, 'post', body)
}

// //התחברות בעל עסק
// export const LogInPro = (ID_number, password) => {
//     console.log(`Professional/OneProfessional/${ID_number}/${password}`)
//     return Fetch(`Professional/OneProfessional/${ID_number}/${password}`, 'get')
// }

// התחברות בעל עסק פונקציית POST עם FROMBODY...... לא דרך נכונה... צריך לשנות את זה לגט... אבל לבנתיים....................
export const LogInProo = (body) => {

    return Axios(`Professional/OneProfessional`, 'post',body) 
}

// export const BussinesCanGiveTreatment = (body) => { // צריך לעדכן לפוסט.....................................

//     return Axios(`Business_can_give_treatmentController/All_the_treatments_appointment_can_give`, 'post',body) 

// }

// export const BussinesCanGiveTreatment = (num) => {
//     // const body = { Business_Numberr: num };
//     return AxiosNum(`Business_can_give_treatmentController/All_the_treatments_appointment_can_give`, 'post', num);
//   };
export const BussinesCanGiveTreatment = (Business_Numberr) => {
    return Axios(`Business_can_give_treatmentController/All_the_treatments_appointment_can_give/${Business_Numberr}`, 'post')
}
// export const BussinesCanGiveTreatment = (appointmentID) => {
//     return Axios(`Business_can_give_treatmentController/All_the_treatments_appointment_can_give`, 'get', {params: {appointmentID}});
//   }

//הרשמת לקוח -פרטיים אישים
export const Professional_Registration = (body) => {

    return Axios(`Professional/NewProfessional`,'post',body)

}

// הרשמת לקוח
export const Cli_Registration = (body) => {

    return Axios(`Client/NewClient`, 'post',body) 

}

//הרשמת בעל עסק-פרטי העסק
export const Professional_Business = (body) => {

    return Axios(`Business/NewBusiness`, 'post',body)

}

//פונקצייה להוספת תור חדש דרך פונקציית פוסט בשרת.
export const NewAppointmentPost = (body) => {
    return Axios(`Appointment/NewAppointment`, 'post', body) 
}

//המשך הוספת תור חדש - הוספת סוגי הטיפולים האפשריים לתור
export const All_treatment_in_appointment = (body) => {

    return Axios(`Appointment_can_give_treatment/NewAppointment_can_give_treatment`, 'post', body)
}

//התחברות בעל עסק
export const Type_treatment_for_businnes = (businnes_number) => {
    console.log(`Business_can_give_treatmentController/All_the_treatments_appointment_can_give${businnes_number}/${password}`)
    return Fetch(`Professional/OneProfessional`, 'post')
}



