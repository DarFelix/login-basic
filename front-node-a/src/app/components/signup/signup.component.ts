import { Component } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor( 
    private authService: AuthService,
    private router: Router
    ){}

  user = {
    email: '',
    password: ''
  }

  signUp(){
    this.authService.signUp(this.user)
    .subscribe(
      (res: any)=> {
        console.log(res.token);
        localStorage.setItem('token', res.token);
        this.router.navigate(['/private']);
      },
      err=> console.log(err)
      
    )
  }

}
