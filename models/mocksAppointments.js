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

var AppointmentCreation = function() {
    this.appointment = {
        id : appointmentCount ++,
        creation_date : new Date().toISOString(),
        confirm : false,
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

var confirmAppointment = (id) => {
    var result = null;
    for(var i = 0 ; i < storedAppointments.length; i++){
        if(storedAppointments[i].id === id){
            storedAppointments[i].confirm = true;
            result = storedAppointments[i];
        }
    }
    return result;
};


module.exports = {
    getAppointments : storedAppointments,
    findBySpeciality : searchAppointmentBySpeciality,
    findByPatientId : searchAppointmentByPatientId,
    createAppointment : createAppointmentForPatient,
    confirmAppointment : confirmAppointment
}
