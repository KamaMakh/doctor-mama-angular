import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  pageUser = 1;
  pageChildAvatar = 2;
  pageDirectory = 3;
  pageWebinar = 4;
  pageSubscription = 5;
  pageCommercial = 6;

  currentPage: number;
  currentUser: any;
  role: string;

  constructor(private router: Router,
              private authenticationService: AuthenticationService) {
  }

  selectPage(page: number) {
    this.currentPage = page;
  }

  ngOnInit(): void {
    this.currentPage = this.pageUser;
    this.currentUser = localStorage.getItem('currentUserDoctorMama') ? JSON.parse(localStorage.getItem('currentUserDoctorMama')) : '';
    this.role = this.currentUser?.roles[0]?.role;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}

