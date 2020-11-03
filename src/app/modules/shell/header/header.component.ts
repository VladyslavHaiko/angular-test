import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AuthenticationService} from '../../auth/services/authentication.service';
import {CredentialsService} from '../../auth/services/credentials.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  menuHidden = true;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private credentialsService: CredentialsService
  ) {
  }

  ngOnInit(): void {
  }

  toggleMenu(): void {
    this.menuHidden = !this.menuHidden;
  }

  logout(): void {
    this.authenticationService
      .logout()
      .subscribe();
  }

  get username(): string | null {
    const credentials = this.credentialsService.credentials;
    return credentials ? credentials.name : null;
  }

}
