import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserResponse } from 'src/app/responses/user/user.response';
import { TokenService } from 'src/app/service/token.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  userResponse?: UserResponse | null;
  isPopoverOpen = false;
  activeNavItem: number = 0;

  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    private router: Router,

  ) {}

  ngOnInit(): void {
    this.userResponse = this.userService.getUserResponseFromLocalStorage();
  }

  togglePopover(event: Event): void {
    event.preventDefault();
    this.isPopoverOpen = !this.isPopoverOpen;
  }
  
  handleItemClick(index: number): void {
    if(index === 0) {
      debugger
      this.router.navigate(['/user-profile']);
    }
    if(index === 1) {
      this.router.navigate(['/'])
    }
    if(index === 2) {
      this.userService.removeUserFromLocalStorage();
      this.tokenService.removeToken();
      this.userResponse = this.userService.getUserResponseFromLocalStorage();
    }
    this.isPopoverOpen = false;
  }


  setActiveNavItem(index: number) {    
    this.activeNavItem = index;
    // alert(this.activeNavItem);
  }  

}
