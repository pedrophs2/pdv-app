import { Component, HostBinding, Input, HostListener, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'src/app/model/MenuItem';

@Component({
    selector: '[appSidebar]',
    host: {
        'class': 'c-sidebar c-sidebar-dark'
    },
    templateUrl: './sidebar.component.html'
})
// tslint:disable: curly variable-name
export class SidebarComponent {

    menuItems: MenuItem[] = [
        {
            label: 'Dashboard',
            icon: 'home',
            path: 'home'
        },
        {
            label: 'Produto',
            icon: 'splitscreen',
            path: 'product-list'
        },
        {
            label: 'PDV',
            icon: 'point_of_sale',
            path: 'sale'
        },
        {
            label: 'Vendas',
            icon: 'attach_money',
            path: 'sales'
        }
    ]

    @HostBinding('class.c-sidebar-show') _alwaysShow = false;
    @HostBinding('class.c-sidebar-lg-show') _show = true;
    private _enableClickOutside = false;

    @Input()
    @HostBinding('class.c-sidebar-fixed') fixed = true;

    constructor(private eRef: ElementRef, private router: Router) { }

    toggle(): void {
        const smalScreen = window && window.innerWidth <= 992;
        if (smalScreen) {
            if (this._alwaysShow) {
                this._alwaysShow = false;
                this._show = false;
            } else {
                this._show = true;
                this._alwaysShow = true;
                this._enableClickOutside = false;
                setTimeout(() => this._enableClickOutside = true, 150);
            }
        } else {
            if (this._show || this._alwaysShow) {
                this._alwaysShow = false;
                this._show = false;
            } else {
                this._show = true;
            }
        }
    }

    @HostListener('document:click', ['$event'])
    clickout(event: any) {
        if (this._alwaysShow && this._enableClickOutside) {
            if (this.eRef.nativeElement.contains(event.target)) {
                // clicked inside
            } else {
                // clicked outside
                this._alwaysShow = false;
            }
        }
    }

    public sair() {
        localStorage.clear();
        this.router.navigate(['login']);
    }

}
