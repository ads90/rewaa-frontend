import { Component, OnInit } from '@angular/core'; 
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    email: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  userName: string;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true; 
      var currentUser = this.tokenStorage.getUser();
      if(currentUser)
      {  this.userName=currentUser.Username;
    }
  }
  }

  onSubmit(): void {
   
    const user = {
      username: this.form.username,
      email: this.form.email,
      password: this.form.password
    };
 
    this.authService.login(user).subscribe(
      data => {
        this.tokenStorage.saveToken(data.data.token);
        this.tokenStorage.saveUser(data.data);
        this.userName=data.Username;

        this.isLoginFailed = false;
        this.isLoggedIn = true; 
        this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }
}