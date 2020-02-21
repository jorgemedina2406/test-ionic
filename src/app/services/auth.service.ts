import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { ToastController, Platform } from '@ionic/angular';

import { Router } from '@angular/router';
import {map, catchError} from 'rxjs/operators';
import { throwError, BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string;
  authState = new BehaviorSubject(false);
  menu;

  OPTIONS = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  };


  constructor(
    public http: HttpClient,
    public router: Router,
    private storage: Storage,
    private platform: Platform,
    public toastCtrl: ToastController,
    private route: Router
  ) {
    
    this.platform.ready().then(() => {
      this.isLogin();
    });

    this.loadStorage();

  }

  /**** ****/
  /* Login */
  /**** ****/
  login(email: string, password: string) {

    const url = 'https://dev.tuten.cl/TutenREST/rest/user/' + email;

    const headers = new HttpHeaders().set('password', password).set('app', 'APP_BCK');

    const form = {
        password,
        app: 'APP_BCK',
        Accept: 'application/json'
    };

    return this.http.put( url, form, { headers: headers })
                .pipe(map( (resp: any) => {
                  this.token = resp.sessionTokenBck;
                  this.saveStorage( resp.sessionTokenBck );
                  this.authState.next(true);
                  return true;
                })).pipe(
                  catchError( err => {
                    this.showToast('Credenciales Invalidas');
                    return throwError( err );
                }));

  }

  /**** ****/
  /* Verify is Login */
  /**** ****/
  isLogin() {

    this.storage.get('token').then((val) => {
      if ( val ) {
        this.authState.next(true);
      }
    });

  }

  /************* *************/
  /* Get bookings information */
  /************* *************/
  getInfo() {

    let url = 'https://dev.tuten.cl/TutenREST/rest/user/contacto%40tuten.cl/bookings?current=true';

    const headers = new HttpHeaders()
                    .set('adminemail', 'testapis@tuten.cl')
                    .set('app', 'APP_BCK')
                    .set('token', this.token);

    return this.http.get( url, { headers: headers } );

  }

  /************* *************/
  /* Save token information in LocalStorage */
  /************* *************/
  saveStorage( token: string ) {

    this.storage.set('token', token );
    this.token = token;

  }

  /************* *************/
  /* Get the token information */
  /************* *************/
  async loadStorage() {

    await this.storage.get('token').then((val) => {
        if ( val ) {
          this.token = val;
          this.authState.next(true);
        } else {
          this.token = '';
        }
      });
  }

  /**** ****/
  /* Logout */
  /**** ****/
  logout(){

    this.token = '';
    this.storage.remove('token').then(() => {
      this.authState.next(false);
      this.route.navigate(['/']);
      this.showToast('Sesion cerrada');
    });    

  }

  isAuthenticated() {
    return this.authState.value;
    
  }

  async showToast( msg ) {
    const toast = await this.toastCtrl.create({
      message: msg,
      // showCloseButton: true,
      duration: 3000,
      buttons: [
        {
          side: 'end',
          icon: '',
          text: '',
          handler: () => {
            console.log('Favorite clicked');
          }
        }, {
          text: 'Ok',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
      // closeButtonText: 'Ok'
    });
    await toast.present();
  }

}
