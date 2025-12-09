import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppConstants } from "../app-constants";
import { environment } from "src/environments/environment";
import { UserLoginDTO } from "../domain/dto/user/user-login.dto";
import { UserDTO } from "../domain/dto/user/user.dto";
import { CreateUserDTO } from "../domain/dto/user/create-user.dto";
import { EditUserDTO } from "../domain/dto/user/edit-user.dto";

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

    list(pagina?: number, tamanho?: number) {
        return this.http.get<UserDTO[]>(`${this.apiURL}`);
    }

    getUserByName(name: string) {
        return this.http.get<UserLoginDTO>(`${this.apiURL}/username/${name}`);
    }

    createUser(user: CreateUserDTO) {
        return this.http.post<CreateUserDTO>(`${this.apiURL}`, user);
    }

    editUser(user: EditUserDTO) {
        return this.http.put<UserDTO>(`${this.apiURL}`, user);
    }

    getUserById(id: number) {
        return this.http.get<UserDTO>(`${this.apiURL}/${id}`);
    }
}
