import { Component, ViewChild } from '@angular/core';
import { LoginDTO } from '../../dto/user/login.dto';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { NgForm } from '@angular/forms';
import { LoginResponse } from 'src/app/responses/user/login.response';
import { TokenService } from 'src/app/service/token.service';
import { RoleService } from 'src/app/service/role.service';
import { Role } from 'src/app/models/role';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @ViewChild('loginForm') loginForm!: NgForm;
  phoneNumber: string = '11112222';
  password: string = '11112222';

  roles: Role[] = [];
  rememberMe: boolean = true;
  selectedRole: Role | undefined;


  constructor(
    private router: Router, 
    private userService: UserService,
    private tokenService: TokenService,
    private roleService: RoleService
  ) {}

  onPhoneNumberChange() {
    console.log(`Phone typed: ${this.phoneNumber}`);
  }

  ngOnInit(){

    debugger
    this.roleService.getRoles().subscribe({
      next: (roles: Role[]) => {
        debugger
        this.roles = roles;
        this.selectedRole = roles.length > 0 ? roles[0] : undefined;
      },
      error: (error: any) => {
        debugger
        console.error("can't retrive roles: ", error);
      }
    });
  }

  login() {
    const message =
      `phoneNumber: ${this.phoneNumber}` +
      `password: ${this.password}`;
    // alert(message);
    debugger

    const loginDTO: LoginDTO = {
      phone_number: this.phoneNumber,
      password: this.password,
      role_id: this.selectedRole?.id ?? 1
    };

    this.userService.login(loginDTO).subscribe({
      next: (response: LoginResponse) => {
        debugger;
        const {token} = response;
        this.tokenService.setToken(token);
        // this.router.navigate(['/login']);

      },
      complete: () => {
        debugger;
      },
      error: (error: any) => {
        alert(error.error.message);
      },
    }

    )
  }


}
