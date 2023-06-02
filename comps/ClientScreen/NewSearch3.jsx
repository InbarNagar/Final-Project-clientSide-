import { React, useState, useEffect } from "react";
import { Text, View } from "react-native";
import { GetBusinessDiary } from "../obj/FunctionAPICode";
import Data from "./Data.json";
export default function NewSearch3() {
  const [result, SetResult] = useState([]);
  useEffect(() => {
    GetBusinessDiary().then(
      (result) => {
        console.log(result);
        if (result) {
          SetResult(result);
        }
      },
      (error) => {
        console.log("error", error);
      }
    );
  }, []);

  function GetData(data) {
    let res = [];
    let obj={
        id:data[0].Business_Number,
        diarey:[{
            date:data[0].Date1,
            time:[data[0].Start_time1+"-"+data[0].End_time1]
        },
        // {
        //     date:'2023-06-03',
        //     time:['10-14','17-21']
        // }
    ],
        typeTritment:[{
            dorition:data[0].Treatment_duration,
            type:data[0].Type_treatment_Number
        },
        // {
        //     dorition:'2',
        //     type:'hair'
        // }
    ],
        apointemnt:[
            {
             date:'2023-06-02',
            time:['10-11','11-13']
            
            }
        ]
    }
    for (let i = 1; i < data.length; i++) {
     if(data[i].Business_Number==data[i-1].Business_Number){
        if(data[i].Date1==obj.diarey.date){
            obj.diarey.time.push(data[i].Start_time1+"-"+data[i].End_time1)
        }else{
            obj.diarey.push({
                date:data[i].Date1,
                time:[data[i].Start_time1+"-"+data[i].End_time1]
            })
        }
        if(data[i].typeTritment.type!=obj.typeTritment.type){
            obj.push({
                dorition:data[i].Treatment_duration,
                type:data[i].Type_treatment_Number
            })
        }
        else{
            obj.typeTritment.push({
                
            })
        }



        }else{
            res.push(obj)
        }
    }
  }

  return <></>;
}
