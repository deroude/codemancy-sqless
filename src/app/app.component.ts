import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';
import { User } from 'firebase';
import { GithubService, Repo, RepoFile } from './services/github.service';
import { ProgressService } from './services/progress.service';
import * as yaml from 'js-yaml';
import { OpenAPIObject, SchemaObject } from 'openapi3-ts';
import { ApiService } from './services/api.service';

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
  selectedFile: RepoFile;

  constructor(private auth: AuthService, private github: GithubService, private progress: ProgressService, private apiService: ApiService) {
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

  loadSpec(): void {
    if (this.selectedFile) {
      this.github.loadFile(this.selectedRepo.full_name, this.selectedFile.path).subscribe(yml => {
        const doc: OpenAPIObject = yaml.safeLoad(yml);
        this.apiService.saveApi(doc).subscribe(() => console.log('done'));
      });
    }
  }

}
