import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppConstants } from "../app-constants";
import { environment } from "src/environments/environment";
import { User } from "../model/User";
import { UserDTO } from "../domain/user.dto";

@Injectable({
    providedIn: "root",
})
export class UsuarioService {
    token: any;

    constructor(private http: HttpClient) {}

    apiURL: string = environment.apiBaseUrl + "user";

    userAutenticado() {
        this.token = localStorage.getItem("token");

        if (this.token !== null && this.token.toString().trim() !== null) {
            return true;
        } else {
            return false;
        }
    }

    getUserByName(name: string) {
        return this.http.get<UserDTO>(`${this.apiURL}/username/${name}`);
    }
}
