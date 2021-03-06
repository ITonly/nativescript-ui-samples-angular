import { Component, OnInit, Inject, ViewChild, ViewContainerRef, ComponentRef } from "@angular/core";
import { ExampleItem } from "../exampleItem";
import { ExampleItemService } from "../exampleItemService.service";
import { ActivatedRoute, Router } from '@angular/router';
import { StackLayout } from "ui/layouts/stack-layout";
import * as frameModule from "ui/frame";

@Component({
    moduleId: module.id,
    selector: "tk-example",
    templateUrl: "example.component.html"
})
export class ExampleComponent implements OnInit {
    private _currentExample: ExampleItem;
    private _sub: any;

    constructor(private _router: Router, private _route: ActivatedRoute, private _exampleItemsService: ExampleItemService) {
    }

    @ViewChild('exampleCompPlaceholder', { read: ViewContainerRef }) exampleCompPlaceholder: ViewContainerRef;

    ngOnInit() {
        this._sub = this._route.params.subscribe(params => {
            var parentTitle = params['parentTitle'];
            var tappedTitle = params['tappedTitle'];
            this._currentExample = this._exampleItemsService.getChildExampleItem(parentTitle, tappedTitle, this._exampleItemsService.getAllExampleItems());
        });
    }

    ngOnDestroy() {
        this._sub.unsubscribe();
    }

    public get currentExample(): ExampleItem {
        return this._currentExample;
    }


    public set currentExample(value: ExampleItem) {
        this._currentExample = value;
    }

    public onNavigationButtonTap() {
        frameModule.topmost().goBack();
    }
}