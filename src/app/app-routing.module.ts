import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NSEmptyOutletComponent } from "nativescript-angular";
import { NativeScriptRouterModule } from "nativescript-angular/router";

const routes: Routes = [
    {
        path: "",
        redirectTo: "/(welcomeTab:welcome/default//homeTab:home/default//browseTab:browse/default//searchTab:search/default//aboutTab:about/default//mapTab:map/default)",
        pathMatch: "full"
    },
    {
        path: "welcome",
        component: NSEmptyOutletComponent,
        loadChildren: () => import("~/app/welcome/welcome.module").then((m) => m.WelcomeModule),
        outlet: "welcomeTab"
    },
    {
        path: "home",
        component: NSEmptyOutletComponent,
        loadChildren: () => import("~/app/home/home.module").then((m) => m.HomeModule),
        outlet: "homeTab"
    },
    {
        path: "browse",
        component: NSEmptyOutletComponent,
        loadChildren: () => import("~/app/browse/browse.module").then((m) => m.BrowseModule),
        outlet: "browseTab"
    },
    {
        path: "search",
        component: NSEmptyOutletComponent,
        loadChildren: () => import("~/app/search/search.module").then((m) => m.SearchModule),
        outlet: "searchTab"
    },
    {
        path: "map",
        component: NSEmptyOutletComponent,
        loadChildren: () => import("~/app/map/map.module").then((m) => m.MapModule),
        outlet: "mapTab"
    },
    {
        path: "about",
        component: NSEmptyOutletComponent,
        loadChildren: () => import("~/app/about/about.module").then((m) => m.AboutModule),
        outlet: "aboutTab"
    }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
