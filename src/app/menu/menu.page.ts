import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastController, NavController } from '@ionic/angular';
import { NativeTransitionOptions, NativePageTransitions } from '@ionic-native/native-page-transitions/ngx';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  imagenTemp;

  pages = [
    {
      title: 'Inicio',
      url: '/menu/dashboard',
      icon: '',
      src: '/assets/icon/house.svg'
    },
    {
      title: 'Info App',
      url: '/menu/info-app',
      icon: '',
      src: '/assets/icon/pregunta.svg'

    },
  ];

  constructor( 
    public authService: AuthService,
    public router: Router,
    public toastCtrl: ToastController,
    public navCtrl: NavController,
    private nativePageTransitions: NativePageTransitions
  ) {
  }

  ngOnInit() {
  }

  navigatePage( url ) {
    let options: NativeTransitionOptions = {
      direction: 'left',
      duration: 400,
      slowdownfactor: -1,
      slidePixels: 0,
      iosdelay: 100,
      androiddelay: 150,
      fixedPixelsTop: 0,
      fixedPixelsBottom: 0,
    }

    this.nativePageTransitions.fade(options);
    this.navCtrl.navigateForward(url);
  }

  logout() {
    this.authService.logout();
    this.showToast('Se cerro sesion con exito');
  }

  async showToast( msg ) {
    const toast = await this.toastCtrl.create({
      message: msg,
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
    });
    await toast.present();
  }

}
