import { Component, ViewChildren, QueryList } from '@angular/core';

import { Platform, ToastController, NavController, ModalController, IonRouterOutlet, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './services/auth.service';
import { fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  // set up hardware back button event.
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;
  private backbuttonSubscription: Subscription;

  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;

  imagenSubir: File;
  imagenTemp;
  imageTempArray = [];
  url;

  fileData: File = null;
  
  constructor(
    public authService: AuthService,
    private platform: Platform,
    public route: ActivatedRoute,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    public toastCtrl: ToastController,
    public navCtrl: NavController,
    public alertController: AlertController,
    public modalCtrl: ModalController,

  ) {

    this.initializeApp();
    this.backButtonEvent();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.statusBar.backgroundColorByHexString("#3576c2");
      this.splashScreen.hide();
    });

  }

  backButtonEvent() {
    const event = fromEvent(document, 'backbutton');
    this.backbuttonSubscription = event.subscribe(async () => {
      if (this.router.url === '/menu/dashboard' ) {
                if( window.confirm("Esta seguro de salir?") ){
                  this.authService.logout();
                  navigator['app'].exitApp();

                }
              }  else {
               this.navCtrl.navigateBack('/menu/dashboard');
              }
    });
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
