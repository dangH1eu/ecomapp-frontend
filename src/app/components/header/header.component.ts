import { Component, OnInit } from '@angular/core';
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

  constructor(
    private userService: UserService,
    private tokenService: TokenService,

  ) {}

  togglePopover(event: Event): void {
    event.preventDefault();
    this.isPopoverOpen = !this.isPopoverOpen;
  }
  
  handleItemClick(index: number): void {
    if(index === 2) {
      this.userService.removeUserFromLocalStorage();
      this.tokenService.removeToken();
      this.userResponse = this.userService.getUserResponseFromLocalStorage();
    }
    this.isPopoverOpen = false;
  }

  ngOnInit(): void {
    this.userResponse = this.userService.getUserResponseFromLocalStorage();
  }

}
