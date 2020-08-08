import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';
import { User } from 'firebase';
import { GithubService, Repo } from './services/github.service';
import { ProgressService } from './services/progress.service';

@Component({
  selector: 'sqless-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  user$: Observable<User>;
  loading$: Observable<boolean>;
  repos: Repo[] = [];
  selectedRepo: Repo;

  constructor(private auth: AuthService, private github: GithubService, private progress: ProgressService) {
    this.user$ = this.auth.whoAmI$;
    this.github.repos.subscribe(rs => this.repos = rs);
    this.loading$ = this.progress.loading$;
  }

  login(): void {
    this.auth.login();
  }

  logout(): void {
    this.auth.logout();
  }
}
