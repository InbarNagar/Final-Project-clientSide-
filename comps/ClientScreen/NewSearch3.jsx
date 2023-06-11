import { React, useState, useEffect } from "react";
import { Text, View } from "react-native";
import { GetBusinessDiary } from "../obj/FunctionAPICode";
import Data from "./Data.json";
export default function NewSearch3() {
  const [result, SetResult] = useState([]);
  useEffect(() => {
    const searchObj={
        AddressCity: 'חיפה',
        TreatmentNumber: '3',
        gender: 'F',
        Is_client_house:'YES',
    } 

    // NewSearchPost(searchObj).then(
    //     (result) => {
    //       console.log("yes", result.data);
    //       if (result.data) {
    //         SetResponse(result.data);
    //         console.log("amount of results: " + result.data.length);
    //         //מפעיל את הכפתור תצוגת מפה
    //       }
    //     },
    //     (error) => {
    //       console.log("error", error);
    //     }
    //   );
  }, []);

console.log(JSON.stringify(GetData(Data)));
  function GetData(data) {
    let res = [];
    let obj={
        id:data[0].Business_Number,
        businessName:data[0].Name,
        streetAddress:data[0].AddressStreet,
        houseNumber:data[0].AddressHouseNumber,
        city:data[0].AddressCity,
        about:data[0].about,
        phone:data[0].phone,
        facebook:data[0].Facebook_link,
        instagram:data[0].Instagram_link,
        diary:[{
            date:data[0].Date1,
            time:[data[0].Start_time1+"-"+data[0].End_time1]
        },
        // {
        //     date:'2023-06-03',
        //     time:['10-14','17-21']
        // }
    ],
        typeTritment:[{
            duration:data[0].Treatment_duration,
            type:data[0].Type_treatment_Number,
            price:data[0].Price
        },
        // {
        //     duration:'2',
        //     type:'hair'
        // }
    ],
        apointemnt:[
            {
                number:data[0].Number_appointment,
                status:data[0].Appointment_status,
                date:data[0].Date,
                time:[data[0].Start_time+"-"+data[0].End_time]
            
            }
        ]
    }
    let typeTritment=[data[0].Type_treatment_Number];
    for (let i = 1; i < data.length; i++) {
     if(data[i].Business_Number==data[i-1].Business_Number){ //בודק האם העסק שווה לקודם
        if(data[i].Date1==obj.diary[obj.diary.length-1].date){ // בודק האם יש עוד טווח שעות שונה באותו תאריך
             if(!obj.diary[obj.diary.length-1].time.includes(data[i].Start_time1+"-"+data[i].End_time1)){
                obj.diary[obj.diary.length-1].time.push(data[i].Start_time1+"-"+data[i].End_time1)
             }
        }else{ // פותח מיקום חדש במערך לתאריך חדש
            obj.diary.push({
                date:data[i].Date1,
                time:[data[i].Start_time1+"-"+data[i].End_time1]
            })
        }
        if(data[i].Type_treatment_Number!=obj.typeTritment[obj.typeTritment.length-1].type
            &&!typeTritment.includes(data[i].Type_treatment_Number)){ //אם הסוג טיפול שונה מקודמו
            typeTritment.push(data[i].Type_treatment_Number)
            obj.typeTritment.push({
                duration:data[i].Treatment_duration,
                type:data[i].Type_treatment_Number,
                price:data[i].Price
            })
          
        }
        if(data[i].Number_appointment!=obj.apointemnt[obj.apointemnt.length-1].number){//אם המספר תור שונה מקודמו
            obj.apointemnt.push( 
                {
                    number:data[i].Number_appointment,
                    status:data[i].Appointment_status,
                    date:data[i].Date,
                    time:data[i].Start_time+"-"+data[i].End_time
                
                }
                )
        }
        }
        else{
            res.push(obj)
            typeTritment=[data[i].Type_treatment_Number];
            obj={
                id:data[i].Business_Number,
                businessName:data[i].Name,
                streetAddress:data[i].AddressStreet,
                houseNumber:data[i].AddressHouseNumber,
                city:data[i].AddressCity,
                about:data[i].about,
                phone:data[i].phone,
                facebook:data[i].Facebook_link,
                instagram:data[i].Instagram_link,
                diary:[{
                    date:data[i].Date1,
                    time:[data[i].Start_time1+"-"+data[i].End_time1]
                },
            ],
                typeTritment:[{
                    duration:data[i].Treatment_duration,
                    type:data[i].Type_treatment_Number,
                    price:data[i].Price
                },
            ],
                apointemnt:[
                    {
                        number:data[i].Number_appointment,
                        status:data[i].Appointment_status,
                        date:data[i].Date,
                        time:[data[i].Start_time+"-"+data[i].End_time]
                    
                    }
                ]
            }
        }
    }
    res.push(obj)
    console.log(JSON.stringify(res[0].diary[2].time));
    SetResult(res);
    return res;
  }

  return (
  <>
{result && (
  <React.Fragment>
    {(() => {
      const elements = [];
      for (let i = 0; i < result.length; i++) {
        const element = result[i];
        // Render or access properties of the element
        elements.push(<View key={i}>{element}</View>);
      }
      return elements;
    })()}
  </React.Fragment>
)}
  </>
  )
}
