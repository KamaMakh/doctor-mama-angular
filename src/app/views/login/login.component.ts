import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AuthenticationService} from '../../service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading = false;

  login: string;
  password: string;

  textButton = 'Войти';

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
  }

  onFormSubmit() {
    this.loading = true;
    this.authenticationService.login(this.login, this.password)
      .subscribe(
        data => {
          this.loading = false;
          if (data) {
            this.router.navigate(['/']);
          } else {
            this.toastr.error('Нет доступа', 'Error');
          }
        },
        error => {
          this.toastr.error('Нет доступа', 'Error');
          this.loading = false;
        },
      );
  }

}
