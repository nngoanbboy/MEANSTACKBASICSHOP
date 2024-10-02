import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  authService = inject(AuthService);
  isLoggedIn: boolean = false;
  isAdmin$: Observable<boolean> = this.authService.isAdmin$;

  ngOnInit(): void {
    // Cập nhật trạng thái đăng nhập từ token khi khởi tạo component
    this.isLoggedIn = this.authService.isLoggedIn();

    // Kiểm tra trạng thái đăng nhập từ BehaviorSubject
    this.authService.isLoggedIn$.subscribe((isLogged) => {
      this.isLoggedIn = isLogged;
      if (isLogged) {
        // Khi đã đăng nhập, kiểm tra quyền admin
        this.authService.checkAdminStatus();
      }
    });
  }

  logout() {
    this.authService.logout();
  }
}
