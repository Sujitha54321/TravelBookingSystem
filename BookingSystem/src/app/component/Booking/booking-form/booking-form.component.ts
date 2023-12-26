import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import moment from 'moment';
import { Booking } from '../../../model/booking';
import { Bus } from '../../../model/bus';
import { User } from '../../../model/user';
import { switchMap, of, Observable } from 'rxjs';
import { BookingService } from '../../../service/booking.service';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.css'
})
export class BookingFormComponent implements OnInit {
  user!: User;
  isEditable: boolean = false;
  router: any;
  busDetails: any;
  bus!: Bus;
  busId!: number;
  bookingForm!: FormGroup;
  usersession: User = JSON.parse(sessionStorage.getItem("user") ?? '{}');

  bussession: Bus = JSON.parse(sessionStorage.getItem("bus")??'{}');
  bookingsession: Booking = JSON.parse(sessionStorage.getItem("booking")??'{}');
 
  constructor(
    public bookingservice: BookingService,
    public route: Router,
    public activateRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  getBusData() {
  return this.activateRoute.paramMap.pipe(
    switchMap(() => {
      const busData = sessionStorage.getItem('bus');
     return of(busData ? JSON.parse(busData) : null);
   })
  );
}
getUserData() {
  this.activateRoute.paramMap.subscribe(
    () => (this.user = JSON.parse(sessionStorage.getItem('user') ?? '{}'))
  );
  return this.user;
}
ngOnInit(): void {
  this.bookingForm = this.formBuilder.group({
    busId: ['', Validators.required],
     userid: ['', Validators.required],
    departure: ['', Validators.required],
    arrival: ['', Validators.required],
    source: ['', Validators.required],
    destination: ['', Validators.required],
    ticket_amount: ['', [Validators.required, Validators.min(0)]],
  });

  this.activateRoute.params.subscribe((params) => {
    this.busId = +params['id'];
    this.bookingservice
      .getBusById(this.busId)
      .subscribe((busData: { [key: string]: any }) => {
        this.bookingForm.patchValue(busData);
        this.busDetails = busData;
      });
  });
  const user = this.getUserData();

    console.log('bus', this.busDetails);
    console.log('busBookingForm', this.bookingForm);
    this.activateRoute.paramMap.subscribe(() => this.bookingForm);
    console.log(this.bookingForm);

    console.log(user);
    //this.checkSessionAndNavigate();
    //this.onSubmit();
}
onSubmit(): void {
  const { userid } = this.getUserData();
  console.log('User ID:', userid);
  const formData = this.bookingForm.value;
  formData.date = moment().format('YYYY-MM-DDTHH:mm:ss');
  formData.status = "Booked";
  formData.user = { userid: userid };
  formData.bus = { busId: formData.busId };
  console.log('Form data submitted:', formData);
  this.bookingservice
    .addBooking(formData)
    .subscribe((data) => {
      console.log(data);
      if (data.busDetails.associatedBus.busId) {
        alert('Book suessfull')
        this.route.navigateByUrl(`/paymentform/${data.busDetails.associatedBus.busId}/${data.busDetails.lastBookingId.booking_id}`);
        alert('Book suessfull')
      } else {
        alert('Book failed')
      }
    });(error: any)=>{
      console.error(error)
    }
}
updateBus(busId: number) {
  this.route.navigateByUrl('/bookingForm/' + busId);
}

addBooking(): void {
   //this.route.navigateByUrl('/paymentform/:id/:bookingId');
}
checkSessionAndNavigate() {
  if (!this.user) {
    this.route.navigateByUrl('/user/login');
  }
}
logout() {
  if (sessionStorage.getItem('user')) {
    sessionStorage.clear();
    localStorage.clear();
    alert('Logout Successfully');
    this.route.navigateByUrl('/user/login');
  } else {
    alert('No user loged in');
  }
}
}
