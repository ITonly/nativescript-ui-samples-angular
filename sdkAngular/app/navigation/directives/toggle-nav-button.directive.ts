import { ActivatedRoute } from "@angular/router";
import { Directive } from "@angular/core";
import { EventData } from "data/observable";
import { NavigationButton } from "ui/action-bar";
import { Page } from "ui/page";
import { RouterExtensions } from 'nativescript-angular/router';
import app = require("application");

@Directive({
    selector: "[toggleNavButton]"
})

export class ToggleNavButtonDirective {
    constructor(route: ActivatedRoute, page: Page, private routerExtensions: RouterExtensions) {
        let navigationButton = this.createNavigationButton();
        if (app.android) {
            page.actionBar.navigationButton = navigationButton;
        }
    }

    createNavigationButton(): NavigationButton {
        let navigationButton = new NavigationButton();
        navigationButton.visibility = "visible";

        if (app.android) {
            navigationButton.icon = "res://ic_arrow_back_black_24dp"
            navigationButton.on("tap", (args: EventData) => {
                this.routerExtensions.backToPreviousPage();
            });
        }

        return navigationButton;
    }
}