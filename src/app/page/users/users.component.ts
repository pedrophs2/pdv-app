import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { UserDTO } from "src/app/domain/dto/user/user.dto";
import { UsuarioService } from "src/app/service/usuario.service";

@Component({
    selector: "app-users",
    templateUrl: "./users.component.html",
    styleUrls: ["./users.component.scss"],
})
export class UsersComponent implements OnInit {
    users: UserDTO[] = [];
    columns = ["name", "username"];
    elements = 0;
    page = 0;
    length = 5;
    pageSizeOptions: number[] = [5, 10, 15, 100];

    constructor(
        private readonly userService: UsuarioService,
        private readonly dialog: MatDialog,
        private readonly router: Router
    ) {}

    ngOnInit(): void {
        this.listUsers(this.page, this.length);
    }

    listUsers(pagina: number, tamanho: number) {
        this.userService.list(pagina, tamanho).subscribe((response) => {
            this.users = response;
        });
    }

    edit(user: any) {
        this.router.navigate([`/users/${user.id}`]);
    }

    //chamar a paginação
    // paginar(event: PageEvent) {
    //     this.pagina = event.pageIndex;
    //     this.tamanho = event.pageSize;
    //     this.listarProductes(this.pagina, this.tamanho);
    // }
}
