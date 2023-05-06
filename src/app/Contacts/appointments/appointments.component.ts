import { Component } from '@angular/core';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html'
})
export class AppointmentsComponent {

  PageName: string = "Appointments";

  Appointments: any = {
    "Status": 1,
    "ServiceResponse": [
      {
        "ClientName": "baby mr",
        "AppointmentType": "460500",
        "StartTime": "4/3/2023 9:30:00 AM",
        "Clinic": "Main - Admin Site",
        "ClinicSeq": 301,
        "ClinicAddress": "597 W. 11th Street",
        "ClinicAddress2": "Panama City, FL 32401",
        "ClinicPhoneNumber": "850-238-6007",
        "AppointmentDateType": "F",
        "ApptSeqId": 52813098,
        "DocsToBring": "",
        "AppointmentMethod": null
      }
    ]
  }

}
