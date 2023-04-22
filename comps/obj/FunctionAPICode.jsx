import { View, Text } from 'react-native'
import React from 'react'
import { Fetch,Axios } from './Fetch'

export const LogInF = (ID_number, password) => {
    console.log(`Client/OneClient/${ID_number}/${password}`)
    return Fetch(`Client/OneClient/${ID_number}/${password}`, 'get')
}

export const Professional_Registration = (body) => {

    return Axios(`Professional/NewProfessional`, 'post',body) //פונקציה להוספת בעל מקצוע חדש

}

export const Cli_Registration = (body) => {

    return Axios(`Client/NewClient`, 'post',body) // פונקציה להוספת לקוח חדש

}

export const NewAppointmentPost = (body) => {
    return Axios(`Appointment/NewAppointment`, 'post', body) //פונקצייה להוספת תור חדש דרך פונקציית פוסט בשרת.

}