import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { registerElement } from "nativescript-angular/element-registry";

@Component({
    selector: "Welcome",
    templateUrl: "./welcome.component.html",
    styleUrls: ["./welcome.css"]
})
export class WelcomeComponent implements OnInit {
    protected images: any[] = [];
    constructor(
        private _route: ActivatedRoute,
        private _routerExtensions: RouterExtensions
    ) {
        this.images = [
            { title: 'Image 1', file: '~/images/welcome_1.jpg' },
            { title: 'Image 2', file: '~/images/welcome_2.jpg' },
            { title: 'Image 2', file: '~/images/welcome_3.jpg' },
            { title: 'Image 3', file: '~/images/welcome_4.jpg' },
        ];
    }

    ngOnInit(): void {
    }
    onBackTap(): void {
        this._routerExtensions.back();
    }
}
