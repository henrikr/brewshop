import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private _userService: UserService, private _auth: AuthService, private _router: Router) {
    _auth.user$.subscribe(user => {
      if (!user) return;

      _userService.save(user);

      const redirect = localStorage.getItem('redirect');
      if (!redirect) return;

      localStorage.removeItem('redirect');
      _router.navigateByUrl(redirect);
    });
  }
}
