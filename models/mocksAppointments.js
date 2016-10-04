'use strict';
var pat = require('./mocksPacientes').listaPacientes.results;
var otros = require('./mocksPacientes').otrosPat;
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
        confirmed : false,
        speciality : especiality[Math.round(Math.random()*6)+1 ],
        patient_id : patients_id[Math.round(Math.random()*patients_id.length)]
    }
};

var AppointmentCreation = function() {
    this.appointment = {
        id : appointmentCount ++,
        creation_date : new Date().toISOString(),
        confirmed : false,
        speciality : especiality[Math.round(Math.random()*6)+1 ],
    }
};

(() =>{
    for(var i = 0 ; i < 100; i++){
        storedAppointments.push (new Appointment().appointment);
    }
    for(var i = 0 ; i < 50; i++){
        storedAppointments.push (new AppointmentCreation().appointment);
    }
    for(var i = 0 ; i < otros.length; i++){

        pat.push(otros[i]);
    }
})();

var searchAppointmentBySpeciality  = function(speciality){
    var patApp = [];
    for(var i = 0 ; i < storedAppointments.length; i++){
        if(storedAppointments[i].speciality === speciality && storedAppointments[i].patient_id){
            patApp.push(storedAppointments[i]);
        }
    }
    return patApp;
};
var searchAppointmentBySpecialityAndPatient  = function(speciality, patient){
    var patApp = [];
    for(var i = 0 ; i < storedAppointments.length; i++){
        if(storedAppointments[i].speciality === speciality && patient === storedAppointments[i].patient_id){
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

var searchUnUsedAppointment = () => {
    var result = null;
    for(var i = 0 ; i < storedAppointments.length; i++){
        if(!storedAppointments[i].patient_id){
            result = storedAppointments[i];
        }
    }
    return result;
}

var createAppointmentForPatient = (patientId) => {
    for(var i = 0 ; i < patients_id.length; i++){
        if(patients_id[i] === patientId){
            var appo = searchUnUsedAppointment();
            if(appo){
                appo.patient_id = patientId;
                return appo;
            }
        }
    }
    return null;
};

var createAppointmentForPatientByAppId = (appId, patientId) => {
    for(var i = 0 ; i < patients_id.length; i++){
        if(patients_id[i] === patientId){
            var appo = findById(appId);
            if(appo){
                appo.patient_id = patientId;
                return appo;
            }
        }
    }
    return null;
};

var confirmedAppointment = (id,patient_id) => {
    var result = null;
    for(var i = 0 ; i < storedAppointments.length; i++){
        if(storedAppointments[i].id === id){
            if(storedAppointments[i].patient_id === patient_id){
                storedAppointments[i].confirmed = true;
                result = storedAppointments[i];
            }
        }
    }
    return result;
};

var searchAppointmentById  = function(id){
    var result = null;
    for(var i = 0 ; i < storedAppointments.length; i++){
        if(storedAppointments[i].id === id){

            result = storedAppointments[i];
        }
    }
    return result;
};

var searchUnUsedAppointmentBySpeciality = (esp) => {
    var result = [];
    for(var i = 0 ; i < storedAppointments.length; i++){
        if(!storedAppointments[i].patient_id && storedAppointments[i].speciality === esp){
            result.push(storedAppointments[i]);
        }
    }
    return result;
}


module.exports = {
    getAppointments : storedAppointments,
    findBySpeciality : searchAppointmentBySpeciality,
    findBySpecialityAndPatient : searchAppointmentBySpecialityAndPatient,
    findByPatientId : searchAppointmentByPatientId,
    findById : searchAppointmentById,
    createAppointment : createAppointmentForPatient,
    createAppointmentByApp : createAppointmentForPatientByAppId,
    confirmAppointment : confirmedAppointment,
    unsusedBySpeciality : searchUnUsedAppointmentBySpeciality
}
