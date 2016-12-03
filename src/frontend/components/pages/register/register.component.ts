import {Component, OnInit} from '@angular/core';
import {RegisterService} from './register.service';
import {User} from '../../../models/User';
import {LoginHttpService} from '../login/login-http.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {validateEmail} from '../../validators/email-input.validator';
import {validateNotBlank} from '../../validators/not-blank.validator';

@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html',
    styleUrls: ['register.component.css']
})
export class RegisterComponent implements OnInit {

    public registerForm: FormGroup;

    constructor(private loginService: LoginHttpService, private registerService: RegisterService, private formBuilder: FormBuilder) {
    }

    register = () => {
        this.registerService.register({
            email: this.registerForm.controls['email'].value,
            username: this.registerForm.controls['username'].value,
            password: this.registerForm.controls['password'].value
        })
            .subscribe((user: User) =>
                this.loginService.login(user.email, user.password)
            );
    };

    ngOnInit(): void {
        this.registerForm = this.formBuilder.group({
            username: ['', [Validators.required, validateNotBlank]],
            email: ['', [Validators.required, validateEmail, validateNotBlank]],
            password: ['', [Validators.required, validateNotBlank]]
        });
    }
}
