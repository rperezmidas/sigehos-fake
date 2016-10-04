'use strict';
var pat = require('./mocksPacientes').listaPacientes.results;
var appointmentCount = 1;
var storedAppointments = [];
var especiality = {1 : 'Consultorio', 2 : 'Estudios', 3 :'Laboratorio', 4 : 'Farmacia', 5 : 'Vacunatorio', 6 :'Enfermería', 7: 'Dación de Leche'};

var patients_id = [];
for(var i = 0 ; i < pat.length ; i++){
    patients_id.push(pat[i].id);
};

var Appointment = function() {
    this.appointment = {
        id : appointmentCount ++,
        creation_date : new Date().toISOString(),
        confirm : false,
        speciality : especiality[Math.round(Math.random()*6)+1 ],
        patient_id : patients_id[Math.round(Math.random()*patients_id.length)]
    }
};

(() =>{
    for(var i = 0 ; i < 100; i++){
        storedAppointments.push (new Appointment().appointment);
    }
})();

var searchAppointmentBySpeciality  = function(speciality){
    var patApp = [];
    for(var i = 0 ; i < storedAppointments.length; i++){
        if(storedAppointments[i].speciality === speciality){
            patApp.push(storedAppointments[i]);
        }
    }
    return patApp;
};

var searchAppointmentByPatientId  = function(patientId){
    var patApp = [];
    for(var i = 0 ; i < storedAppointments.length; i++){
        if(storedAppointments[i].patient_id === patientId){
            patApp.push(storedAppointments[i]);
        }
    }
    return patApp;
};

module.exports = {
    appointments : storedAppointments,
    findBySpeciality : searchAppointmentBySpeciality,
    findByPatientId : searchAppointmentByPatientId
}