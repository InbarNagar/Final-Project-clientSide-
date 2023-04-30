import {Baseurl} from './Config'
import axios from 'axios';

export const Fetch = (url, method) =>
  new Promise((resolve, reject) => {
    fetch(Baseurl + url, {
      method: method,
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      })
    })
      .then(res => {
        if (res && res.status == 200|| res.status === 201) {
          resolve(res.json());
        } else {
          throw new Error(res.status)
        }
      })
      .catch(err => {
        console.log("url=>", Baseurl + url)
        console.log("method=>", method)
        console.log("status=>", err)
        reject("status code: " + err);
      });
  })

export const Axios = (url, method, body) =>
  new Promise((resolve, reject) => {
    const configurationObject = {
      url:Baseurl+url,
      method: method,
      data: body
    }
   
    axios(configurationObject)
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          resolve(response);
          return { statuss: "OK", data: response.data };
        } 
        else {
          throw new Error(response);
        }
      })
      .catch((error) => {
        console.log("body=>",body);
        console.log("url=>", Baseurl + url)
        console.log("method=>", method)
        reject(error.response.status);
      });
  })

  // export const AxiosNum = (url, method, num) =>
  // new Promise((resolve, reject) => {
  //   const configurationObject = {
  //     url: Baseurl + url,
  //     method: method,
  //     data: num
  //   }
   
  //   axios(configurationObject)
  //     .then((response) => {
  //       if (response.status === 200 || response.status === 201) {
  //         resolve(response);
  //         return { status: "OK", data: response.data };
  //         // return response.data;
  //       } 
  //       else {
  //         throw new Error(response);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log("num=>", num);
  //       console.log("url=>", Baseurl + url)
  //       console.log("method=>", method)
  //       reject(error.response.status);
  //     });
  // })
