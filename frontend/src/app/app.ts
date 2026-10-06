import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs';

import { AuthService } from './core/auth/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLinkActive, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  private readonly url = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map((e) => (e as NavigationEnd).urlAfterRedirects.split('?')[0]),
    ),
    { initialValue: '' },
  );

  protected readonly showHeader = computed(
    () => !!this.url() && !['/login', '/cadastro'].includes(this.url()),
  );

  protected readonly isAdmin = computed(() => this.authService.hasRole('ADMIN'));
  protected readonly isStudent = computed(() => this.authService.hasRole('STUDENT'));

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
