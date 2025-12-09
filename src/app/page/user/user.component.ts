import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CreateUserDTO } from "src/app/domain/dto/user/create-user.dto";
import { UsuarioService } from "src/app/service/usuario.service";

@Component({
    selector: "app-user",
    templateUrl: "./user.component.html",
    styleUrls: ["./user.component.scss"],
})
export class UserComponent implements OnInit {
    titlePage: string = "Cadastro de Usuário";
    formGroup: FormGroup;
    userId?: number;

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly userService: UsuarioService,
        private readonly router: Router
    ) {}

    ngOnInit(): void {
        this.buildFormGroup();
    }

    clearForm() {
        this.formGroup.reset();
    }

    submitForm() {
        const userData = this.formGroup.value;

        if (userData.password === userData.confirmPassword) {
            const user: CreateUserDTO = {
                name: userData.name,
                username: userData.username,
                password: userData.password,
            };

            this.userService.createUser(user).subscribe(
                (response) => {
                    this.router.navigate(["/users"]);
                },
                (err) => {
                    console.log(err);
                }
            );
        }
    }

    private buildFormGroup() {
        this.formGroup = this.formBuilder.group({
            id: [null],
            username: [null, [Validators.required]],
            password: [null],
            confirmPassword: [null],
            name: [null, [Validators.required]],
        });
    }
}
