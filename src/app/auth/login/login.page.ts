import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ToastController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('passwordEyeRegister', {static: false}) passwordEye;

  tokenFcm: string;

  passwordTypeInput  =  'password';
  iconpassword  =  'eye-off';

  constructor(
    private authService: AuthService,
    private router: Router,
    public route: ActivatedRoute,
    public toastCtrl: ToastController,
    private storage: Storage,
    public navCtrl: NavController
  ) {
    this.authService.menu = false;

    this.route.paramMap.subscribe((params: ParamMap) => {

      this.storage.get('token').then((val) => {
        if ( val ) {
          this.navCtrl.navigateForward('/menu/dashboard');
        }
      });
    });

  }

  ngOnInit() {
  }

  togglePasswordMode() {
    this.passwordTypeInput  =  this.passwordTypeInput  ===  'text'  ?  'password'  :  'text';
    this.iconpassword  =  this.iconpassword  ===  'eye-off'  ?  'eye'  :  'eye-off';
    this.passwordEye.el.setFocus();
  }

  login(form){

    if( form.invalid ) {
      this.showToast('El correo o la contraseña es incorrecta');
      return;
    }

    this.authService.login(form.value.email, form.value.password)
    .subscribe((res) => {
      this.showToast('Ingreso con exito');
      this.router.navigateByUrl('/menu/dashboard');
    });
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
      duration: 3000
    });
    await toast.present();
  }

}
