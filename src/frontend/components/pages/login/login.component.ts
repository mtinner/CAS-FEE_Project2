import {Component, OnInit} from '@angular/core';
import {LoginHttpService} from './login-http.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {validateEmail} from '../../validators/email-input.validator';
import {validateNotBlank} from '../../validators/not-blank.validator';

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {

    public email = '';
    public password = '';
    public loginForm: FormGroup;

    constructor(private loginService: LoginHttpService, private formBuilder: FormBuilder) {
    }

    login = () => {
        this.loginService.login(this.email, this.password);
    };

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, validateEmail, validateNotBlank]],
            password: ['', [Validators.required, validateNotBlank]]
        });
    }
}
