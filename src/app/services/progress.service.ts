import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {

  private loadingState$: Subject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  get loading$(): Observable<boolean> {
    return this.loadingState$;
  }

  public start(): void {
    this.loadingState$.next(true);
  }

  public stop(): void {
    this.loadingState$.next(false);
  }
}
