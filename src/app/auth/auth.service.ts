import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {

  token: string = '';
  isSuccessfulSignedIn = false;

  constructor(private router: Router )  {}
  /***
   * signs up a user with user email adn password.
   * conects to the firebase api/sdk and calls the firebase createUserWIthEmailAndPassword
   * which returns a promise.
   */
  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password).then( (value) => {
      console.log(value);
    }).catch(
      (error) => console.log(error)
    );
  }

  /**
   *signin to by using the email and password.
   *
   * @param {string} email
   * @param {string} password
   * @memberof AuthService
   */
  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((resolveResponse) => {
            console.log(resolveResponse);
            firebase.auth().currentUser.getIdToken()
                .then((token: string) => {
                  this.token = token;
                  this.isSuccessfulSignedIn = true;
                  this.router.navigate(['../']);
                })
                .catch(error => console.error('unable to retrive the token : ' + error));
     })
    .catch((error) => console.log(error));
  }

  /**
   * returns a fresh toekn or a token which was retrieved during user signin.
   *
   * @returns
   * @memberof AuthService
   */
  getAuthToken() {
    firebase.auth().currentUser.getIdToken().then(token => this.token = token);
    return this.token;
  }

  /**
   * checks for a valid token.
   * @returns true if user is logged in else false.
   */
  isAuthenticated() {
    return this.token != null;
  }

  /***
   * logs out the user.
   */
  logout() {
    firebase.auth().signOut();
    this.token = null;
    this.router.navigate(['../']);
  }

}
