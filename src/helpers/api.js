import request from "./request.js";

// export function getPatients(){
//   return request({
//     url:'endpoint',//url que le mandas http://localhost:3000_/endpoint
//     method:'get' // get, post, delete
//     data:{},//body
//     params:{}//parametros /endpoint?id=1
//   })
// }


//Patients
export function getPatients(params) {
  return request({
    url: "patients",
    method: "get",
    params,
  });
}

export function createPatients(data) {
  return request({
    url: "patients",
    method: "post",
    data,
  });
}

export function searchPatient(data) {
  return request({
    url: "patients/search",
    method: "post",
    data,
  });
}

export function deletePatient(params) {
  return request({
    url: `patients/${params.id}`,
    method: "delete",
  });
}
export function updatePatient(id, data) {
  return request({
    url: `patients/${id}`,
    method: "put",
    data,
  });
}


//consultation


export function createConsultation(data) {
  console.log(data)
  return request({
    url: "consultations",
    method: "post",
    data,
  });
}

export function getConsultation(id) {
  return request({
    url: `consultations/${id}`,
    method: "get",
  });
}

export function updateConsultation(id, data) {
  return request({
    url: `consultations/${id}`,
    method: "put",
    data,
  });
}

export function deleteConsultation(id) {
  return request({
    url: `consultations/${id}`,
    method: "delete",
  });
}
