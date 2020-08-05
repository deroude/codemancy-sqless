import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase/app';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { ProgressService } from './progress.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public error$: Subject<string> = new BehaviorSubject<string>(null);
  public gitToken$: Subject<string> = new BehaviorSubject<string>(localStorage.getItem('githubToken'));

  constructor(private firebaseAuth: AngularFireAuth, private progress: ProgressService) {
    this.firebaseAuth.getRedirectResult().then(result => {
      if (result.credential) {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const token = (result.credential as any).accessToken;
        localStorage.setItem('githubToken', token);
        this.gitToken$.next(token);
      }
    }).catch(error => {
      this.error$.next(error.message);
    });
  }

  login(): void {
    const provider = new auth.GithubAuthProvider();
    provider.addScope('repo');
    this.firebaseAuth.signInWithRedirect(provider);
  }

  logout(): void {
    this.firebaseAuth.signOut();
    localStorage.removeItem('githubToken');
  }

  get whoAmI$(): Observable<User> {
    return this.firebaseAuth.user;
  }

}
