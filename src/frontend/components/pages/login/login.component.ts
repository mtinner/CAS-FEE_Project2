import {Component, OnInit} from '@angular/core';
import {LoginHttpService} from './login-http.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {validateEmail} from '../../validators/email-input.validator';

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {

    private email = 'appUser@admin.ch';
    private password = 'pwd';
    public loginForm: FormGroup;

    constructor(private loginService: LoginHttpService, private formBuilder: FormBuilder) {
    }

    setEmail(value) {
        this.email = value;
    };

    setPassword(value) {
        this.password = value;
    };

    login = () => {
        this.loginService.login(this.email, this.password);
    };

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, validateEmail]],
            password: ['', Validators.required]
        })
    }
}
