import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { TNSPlayer } from 'nativescript-audio-player';
import { DataService } from "../../shared/data.service";

@Component({
    selector: "ItemDetail",
    templateUrl: "./item-detail.component.html"
})
export class ItemDetailComponent implements OnInit {
    sermons: Array<any>;
    series: string;
    _player: TNSPlayer;
    current: string;

    constructor(
        private _data: DataService,
        private _route: ActivatedRoute,
        private _routerExtensions: RouterExtensions
    ) { }

    ngOnInit(): void {
        const id = this._route.snapshot.params.id;
        this.series = id.replace("-", " ");
        this._data.getSermons(id).subscribe((data: any)=> {
             this.sermons = data;
        });
    }

    onBackTap(): void {
        this._routerExtensions.back();
    }
    rowSelect(item: any, $event: any) {
        let lbl = $event.view;
        lbl.backgroundColor = 'green';
        if (this.current) {
            if(this.current  !== item.name) {
                this.current = item.name;
                this.createPlayer(item.url);
                setTimeout(() => {
                    lbl.backgroundColor = 'blue';
                    this.togglePlay();
                }, 5000);
            } else {
                this.togglePlay();
            }
        } else {
            this.current = item.name;
            this.createPlayer(item.url);
            setTimeout(() => {
                lbl.backgroundColor = 'blue';
                this.togglePlay();
            }, 5000);
        }
        // console.log(item);
    }
    createPlayer(url: string) {
        this._player = new TNSPlayer();
        this._player.debug = true;
        this._player
        .initFromUrl({
            audioFile: url,
            loop: false,
            completeCallback: this._trackComplete.bind(this),
            errorCallback: this._trackError.bind(this)
        })
        .then(() => {
            this._player.getAudioTrackDuration().then(duration => {
                // iOS: duration is in seconds
                // Android: duration is in milliseconds
                console.log(`song duration:`, duration);
            });
        });
    }
    togglePlay() {
        if (this._player.isAudioPlaying()) {
            this._player.pause();
        } else {
            this._player.play();
        }
    }
    _trackComplete(args: any) {
        console.log('reference back to player:', args.player);
        // iOS only: flag indicating if completed successfully
        console.log('whether song play completed successfully:', args.flag);
    }

    _trackError(args: any) {
        console.log('reference back to player:', args.player);
        console.log('the error:', args.error);
        // Android only: extra detail on error
        console.log('extra info on the error:', args.extra);
    }
}
