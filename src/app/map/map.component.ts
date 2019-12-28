import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { registerElement } from "nativescript-angular/element-registry";
import * as GoogleMapsUtils from "nativescript-google-maps-utils"
registerElement("MapView", () => require("nativescript-google-maps-sdk").MapView);
@Component({
    selector: "Map",
    templateUrl: "./map.component.html"
})
export class MapComponent implements OnInit {
    constructor(
        private _route: ActivatedRoute,
        private _routerExtensions: RouterExtensions
    ) { }

    ngOnInit(): void {
    }

    onBackTap(): void {
        this._routerExtensions.back();
    }

    onMapReady = (event) => {
        console.log("Map Ready");
    };
}
