import { Component } from '@angular/core';
import { User } from 'src/app/User';
import { UserTableService } from 'src/app/services/user-table.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css'],
})
export class UserTableComponent {
  users: User[] = [];
  displayedColumns: string[] = ['email', 'phone', 'name', 'Actions'];
  delCheck = false;
  delUser: any;

  constructor(
    private userTableService: UserTableService,
    private router: Router,
    private cookies: CookieService
  ) {}

  ngOnInit(): void {
    this.userTableService.getUsers().subscribe({
      next: (users) => (this.users = users),
      error: (e) => this.errorHandler(e),
    });
  }

  errorHandler(e: any) {
    alert(e.error);
    this.router.navigateByUrl('/login');
  }

  delClicked(u: any) {
    this.delCheck = true;
    this.delUser = u;
  }

  crossDel() {
    this.delCheck = false;
  }

  processDel() {
    this.userTableService.deleteUser(this.delUser.email).subscribe({
      next: (res) => this.resDel(),
      error: (e) => this.errDel(e),
    });
  }

  resDel() {
    this.delUser = {};
    alert('User Deleted Successfuly.');
    this.router.navigateByUrl('/login')
  }

  errDel(e: any) {
    this.delUser = {};
    this.delCheck = false;
    alert(e.error.msg);
  }

  editClicked(user: any) {
    this.router.navigate(['edit', user.email]);
  }

  logOut() {
    this.cookies.delete('auth_token');
    this.router.navigateByUrl('/login');
  }
}
