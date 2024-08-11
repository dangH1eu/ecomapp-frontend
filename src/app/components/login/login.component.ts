import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginDTO } from '../../dto/user/login.dto';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { NgForm } from '@angular/forms';
import { LoginResponse } from 'src/app/responses/user/login.response';
import { TokenService } from 'src/app/service/token.service';
import { RoleService } from 'src/app/service/role.service';
import { Role } from 'src/app/models/role';
import { UserResponse } from 'src/app/responses/user/user.response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  @ViewChild('loginForm') loginForm!: NgForm;

  // user
  // phoneNumber: string = '22223333';
  // password: string = '22223333';

  // admin
  phoneNumber: string = '11223344';
  password: string = '11223344';


  roles: Role[] = [];
  rememberMe: boolean = true;
  selectedRole: Role | undefined;
  userResponse?: UserResponse


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
  createAccount() {
    debugger
    this.router.navigate(['/resgister']);
  }

  login() {
    const message =
      `phoneNumber: ${this.phoneNumber}` +
      `password: ${this.password}`;
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
        if(this.rememberMe) {
          this.tokenService.setToken(token);
          debugger

          this.userService.getUserDetail(token).subscribe({
            next: (response: any) => {
              debugger
              this.userResponse = {
                ...response,
                date_of_birth: new Date(response.date_of_birth),
              };
              this.userService.saveUserResponseToLocalStorage(this.userResponse);

              if(this.userResponse?.role.name == 'admin') {
                this.router.navigate(['/admin']);    
              } else if(this.userResponse?.role.name == 'user') {
                this.router.navigate(['/']);                      
              }
            },
            complete: () => {
              debugger
            },
            error: (error: any) => {
              debugger
              alert(error.error.message);
            }
          });
        }
      },
      complete: () => {
        debugger;
      },
      error: (error: any) => {
        console.log(error.error.message);
      },
    }

    )
  }


}
