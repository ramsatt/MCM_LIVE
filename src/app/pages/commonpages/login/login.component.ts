import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from './services/login.service';
import {DOCUMENT} from '@angular/platform-browser';
import {GeneralsettingsService} from '../../settings/services/generalsettings.service';
import {GlobalVariable} from '../../../global/global';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../settings/services/users/user.service';
declare var $;
declare var window;
declare var TweenMax;
declare var Linear;
declare var swal;

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
    resultsdata: any;
    username: any = '';
    password: any = '';
    logindata: any = '';
    ucmkeyid: any = '';
    sessidd: any = '';
    loginmenu: any = '';
    urmkeyid: any = '';
    umkeyid: any = '';
    gs_logo: any;
    logo_img: any;
    load_gen: any;
    escltPassword: any;
    results: any;
    resetuserid: any;
    enableval: any;
    email: any;
    LoginForm: FormGroup;
    globalIRid: any;

    constructor(public router: Router, public gen: GeneralsettingsService, public user: UserService, public login: LoginService, @Inject(DOCUMENT) private document: Document, private fb: FormBuilder) {
        this.LoginForm = this.fb.group({
            'UserName': [null, Validators.required],
            'Password': [null, Validators.required],
        });
    }

    ngOnInit() {
        this.LoadGenral();
        this.document.body.classList.add('body_image');
        this.sessidd = localStorage.getItem('ucmid');
        this.globalIRid = localStorage.getItem('globalIRid');
        if (this.sessidd !== null) {
            this.router.navigate(['admin/dashboard']);
        }
        $(function () {

            // Add class to body for change layout settings
            $('body').addClass('single-page single-page-inverse body_image');

            // Form Validation
            $('#form-validation').validate({
                submit: {
                    settings: {
                        inputContainer: '.form-group',
                        errorListClass: 'form-control-error',
                        errorClass: 'has-danger'
                    }
                }
            });
            $('.switch-to-fullscreen').on('click', function () {
                $('.cat__pages__login').toggleClass('cat__pages__login--fullscreen');
            });
            // Set Background Image for Form Block
            function setImage() {
                const imgUrl = $('.page-content-inner').css('background-image');

                $('.blur-placeholder').css('background-image', imgUrl);
            }

            function changeImgPositon() {
                const width = $(window).width(),
                    height = $(window).height(),
                    left = -(width - $('.single-page-block-inner').outerWidth()) / 2,
                    top = -(height - $('.single-page-block-inner').outerHeight()) / 2;
                $('.blur-placeholder').css({
                    width: width,
                    height: height,
                    left: left,
                    top: top
                });
            }

            setImage();
            changeImgPositon();

            $(window).on('resize', function () {
                changeImgPositon();
            });
            // Mouse Move 3d Effect
            const rotation = function (e) {
                const perX = (e.clientX / $(window).width()) - 0.5;
                const perY = (e.clientY / $(window).height()) - 0.5;
                TweenMax.to('.effect-3d-element', 0.4, {
                    rotationY: 15 * perX,
                    rotationX: 15 * perY,
                    ease: Linear.easeNone,
                    transformPerspective: 1000,
                    transformOrigin: 'center'
                });
            };
        });
    }

    Navigation(link) {
        this.router.navigate([link]);
    }

    LoadGenral() {
        this.gen.loadgeneral().subscribe(
            data => {
                this.load_gen = data;

                this.gs_logo = data[0].GS_Logo;
                this.logo_img = GlobalVariable.BASE_FILE_API + 'uploads/logo/' + this.gs_logo;
            }
        );
    }

    Login(value) {
        const credentials = new FormData();
        credentials.append('userName', value.UserName);
        credentials.append('passWord', value.Password);
        this.login.login(credentials).subscribe(session => {
            if (session.isLoggedIn === true && session.UserCategoryID != null) {
                localStorage.setItem('ucmid', session.UserCategoryID);
                localStorage.setItem('urmid', session.UserRoleID);
                localStorage.setItem('umid', session.UserID);
                localStorage.setItem('isLoggedIN', session.isLoggedIn);
                localStorage.setItem('accessTocken', session.UserAccessTocken);
                if (this.globalIRid) {
                    this.router.navigate(['tickets/ir/view/' + this.globalIRid]);
                } else {
                    this.router.navigate(['admin/dashboard']);
                }
            } else if (session.isLoggedIn === false || session.UserCategoryID == null) {
                $(() => {
                    swal({
                        title: 'Login Failed!',
                        text: 'Incorrect username or password',
                        type: 'error',
                        confirmButtonClass: 'btn-danger'
                    });
                });
            }
        }, err => {
        });
    }

    ngOnDestroy(): void {
        $(function () {
            $('body').removeClass('body_image');
        });
    }

    formrefresh() {
        $('#UpdateUser').trigger('reset');
    }

    updateuser(value) {
        this.user.resetpwd(this.email).subscribe(
            data => {
                this.results = data;
                if (this.results !== '') {
                    this.user.resetpwdmail(this.email).subscribe(
                        NewData => {
                            this.resultsdata = NewData;
                            if (this.resultsdata[0].result === 'success') {
                                // this.HideupdateUserModel();
                                swal({
                                    title: 'Mail Sent!',
                                    text: 'Password  sent to your registered email id successfully',
                                    type: 'success',
                                    confirmButtonClass: 'btn-success'
                                });
                            }
                        }
                    );
                } else {
                    swal({
                        html: true,
                        title: 'Invalid Email ID!',
                        text: 'Please enter a valid registered email id.' + '<br>' +
                        'In case if you forget your registered email id, Please contact mcmadministrator.',
                        type: 'error',
                        confirmButtonClass: 'btn-danger'
                    });
                }
            }
        );
    }
}
