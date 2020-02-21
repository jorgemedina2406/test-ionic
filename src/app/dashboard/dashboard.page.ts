import { Component, OnInit } from '@angular/core';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  refresh = false;
  public info;
  public searchText: string;
  public width: string = '40';

  items = [];

  constructor(
    public route: ActivatedRoute,
    public authService: AuthService,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public platform: Platform
  ) {

    if ( this.platform.width() > 568 ) {
      this.width = '30';
    } else {
      this.width = '40';
    }

  }

  ngOnInit() {

    this.route.paramMap.subscribe(() => {
      this.authService.getInfo().subscribe( (resp: any) => {
        this.info = resp;
      });
    });
  }

  doRefresh(event) {
    this.refresh = true;

    setTimeout(() => {
      this.refresh = false;
      event.target.complete();
    }, 2000);
  }

  getInfo() {

    this.authService.getInfo()
    .subscribe( (resp: any) => {
      this.info = resp;
    });

  }

  logout() {
    this.authService.logout();
  }

  async showToast( msg ) {
    const toast = await this.toastCtrl.create({
      message: msg,
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
      ],
      duration: 3000,
    });
    await toast.present();
  }

}
