import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { OpenAPIObject } from 'openapi3-ts';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private auth: AuthService, private firestore: AngularFirestore) { }

  saveApi(obj: OpenAPIObject): Observable<void> {
    return this.auth.whoAmI$.pipe(
      filter(me => !!me),
      switchMap(me => this.firestore.collection(`accounts/${me.email}/api`).get().pipe(
        switchMap(snap => {
          if (!snap.empty) {
            const batch = this.firestore.firestore.batch();
            snap.forEach(doc => batch.delete(doc.ref));
            batch.commit();
          }
          const id = this.firestore.createId();
          return this.firestore.collection(`accounts/${me.email}/api`).doc(id).set({ content: JSON.stringify(obj) });
        }))
      )
    );
  }
}
