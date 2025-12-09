import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AppConstants } from "../app-constants";
import { User } from "../domain/model/User";
import { Observable } from "rxjs";
import { Token } from "../domain/model/Token";

@Injectable({
    providedIn: "root",
})
export class LoginService {
    constructor(private http: HttpClient, private router: Router) {}

    recuperar(login: any) {
        let user = new User();
        user.login = login;

        return this.http
            .post(AppConstants.getBaseUrlPath + "recuperar/", user)
            .subscribe(
                (data) => {
                    alert(JSON.parse(JSON.stringify(data)).error);
                },
                (error) => {
                    console.error("Erro ao recuperar login");
                    alert("Erro ao recuperar login!");
                }
            );
    }

    login(usuario: any): Observable<Token> {
        return this.http.post<Token>(
            AppConstants.baseLogin,
            JSON.stringify(usuario)
        );
    }
}
