// export class User {
//   userid: number;
//   first_name: string;
//   last_name: string;
//   username: string;
//   password: string;
//   email_id: string;
//   phoneNumber: string;
//   profileImage:string;
//   address:string;
//   district:string;
//   state:string;

//   constructor( userid: number,first_name: string,last_name: string,username: string,
//       password: string,email_id: string,phoneNumber: string,
//       profileImage:string,
//       address:string,
//       district:string,
//       state:string) {
//           this.userid = userid;
//           this.first_name = first_name;
//           this.last_name = last_name;
//           this.username = username;
//           this.password = password;
//           this.email_id = email_id;
//           this.phoneNumber= phoneNumber;
//           this.profileImage=profileImage;
//           this.address=address;
//           this.district=district;
//           this.state=state;

//   }
// }
export class User {
  userid: number;
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  email_id: string;

  constructor( userid: number,first_name: string,last_name: string,username: string,
      password: string,email_id: string) {
          this.userid = userid;
          this.first_name = first_name;
          this.last_name = last_name;
          this.username = username;
          this.password = password;
          this.email_id = email_id;

  }
}
