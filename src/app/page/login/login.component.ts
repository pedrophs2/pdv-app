import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { LoginService } from "src/app/service/login.service";
import { UsuarioService } from "src/app/service/usuario.service";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
    public loginValid = true;
    public username = "";
    public password = "";

    formulario: FormGroup;
    usuario = { username: "", password: "" };
    token: any;

    constructor(
        private loginService: LoginService,
        private router: Router,
        private usuarioService: UsuarioService
    ) {}

    ngOnInit() {
        this.token = localStorage.getItem("token");
        if (this.token !== null && this.token.toString().trim() !== null) {
            this.router.navigate(["home"]);
        }
    }

    public onSubmit() {
        this.usuario.username = this.username;
        this.usuario.password = this.password;

        this.loginService.login(this.usuario).subscribe(
            (data) => {
                var token = data.Authorization.split(" ")[1];
                localStorage.setItem("token", token);
                this.setLoggedUser(this.username);
            },
            (error) => {
                console.error("Erro ao fazer login ");
                alert("Acesso Negado!");
            }
        );
    }

    private setLoggedUser(name: string) {
        this.usuarioService.getUserByName(name).subscribe((user) => {
            localStorage.setItem("userId", user.id.toString());
            this.router.navigate(["home"]);
        });
    }

    public recuperar() {
        this.loginService.recuperar(this.usuario.username);
    }
}
