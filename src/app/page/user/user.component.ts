import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CreateUserDTO } from "src/app/domain/dto/user/create-user.dto";
import { EditUserDTO } from "src/app/domain/dto/user/edit-user.dto";
import { UsuarioService } from "src/app/service/usuario.service";

@Component({
    selector: "app-user",
    templateUrl: "./user.component.html",
    styleUrls: ["./user.component.scss"],
})
export class UserComponent implements OnInit {
    pageTitle: string = "Cadastro de Usuário";
    formGroup: FormGroup;
    userId?: number;

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly userService: UsuarioService,
        private readonly router: Router,
        private readonly currentRoute: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.buildFormGroup();

        this.userId = Number(this.currentRoute.snapshot.paramMap.get("id"));

        if (this.userId) {
            this.pageTitle = "Atualizar Usuário";
            this.fillForm(this.userId);
        }
    }

    clearForm() {
        this.formGroup.reset();
    }

    submitForm() {
        if (!this.userId) this.createUser();
        else this.editUser();
    }

    private createUser() {
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

    private editUser() {
        const userData = this.formGroup.value;

        if (this.userId) {
            const user: EditUserDTO = {
                id: this.userId,
                name: userData.name,
                username: userData.username,
            };

            this.userService.editUser(user).subscribe(
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

    private fillForm(id: number) {
        this.userService.getUserById(id).subscribe((user) => {
            this.formGroup.controls.id.setValue(user.id);
            this.formGroup.controls.username.setValue(user.username);
            this.formGroup.controls.name.setValue(user.name);
        });
    }
}
