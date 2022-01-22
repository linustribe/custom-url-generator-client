import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { User, IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData!: User;

  constructor(
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore,
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = new User(user as IUser);
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user') || '{}');
      } else {
        localStorage.setItem('user', null || '{}');
        JSON.parse(localStorage.getItem('user') || '{}');
      }
    })
  }

  register(email: string, password: string): Observable<{status: string, message: string}> {
    return new Observable<any>((sub) => {  
      this.afAuth.createUserWithEmailAndPassword(email, password).then((res) => {
        this.sendVerficationMail().then(() => {
          sub.next({status: "ok", message: "Successfully Registered"})
        })
        .catch((err) => {
          sub.next({status: "error in verfication", message: err.message})
        })
      }).catch(err => {
        sub.next({status: "error", message: err.message})
      })
    });
  }

  async sendVerficationMail() {
    return (await this.afAuth.currentUser)?.sendEmailVerification().then(() => {
      alert("Sent Verification")
    }) 
  }

  login(email: string, password: string): Observable<{status: string, message: string}> {
    return new Observable<any>((sub) => {
      this.afAuth.signInWithEmailAndPassword(email, password).then((res) => {
        if(res.user?.emailVerified !== true) {
          sub.next({status: "error", message: "Email not verified"})
        } else {
          this.setUserData(res.user as IUser)
          sub.next({status: "ok", message: "Successfully Logged in"})
        }
      }).catch((err) => {
        sub.next({status: "error", message: err.message})
      })
    })
  }

  forgotPassword(passwordResetEmail: string): Observable<{status: string, message: string}> {
    return new Observable<any>((sub) => {
      this.afAuth.sendPasswordResetEmail(passwordResetEmail).then(() => {
        sub.next({status: "ok", message: "Password reset email sent, check your inbox"})
      })
      .catch((err) => {
        sub.next({status: "error", message: err.message})
      })
    })
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return (JSON.stringify(user) !== '{}' && user.emailVerified !== false) ? true : false;  
  }

  setUserData(user: IUser) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData = {
      uid: user.uid,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  logout() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
    })
  }
}
