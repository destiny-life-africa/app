import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { TNSPlayer } from 'nativescript-audio-player';
@Component({
    selector: "Sermon",
    templateUrl: "./sermon.component.html"
})
export class SermonComponent implements OnInit {

    private _player: TNSPlayer;
    constructor(
        private _route: ActivatedRoute,
        private _routerExtensions: RouterExtensions
    ) { }

    ngOnInit(): void {
        const id = +this._route.snapshot.params.id;
        this._player = new TNSPlayer();
        this._player.debug = true; // set true to enable TNSPlayer console logs for debugging.
        this._player
            .initFromUrl({
                audioFile: 'https://dlcmobileapp.blob.core.windows.net/faith-series/Part%201%20-%20I%20want%20to%20believe%20in%20God%20October%202019.mp3', // ~ = app directory
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

    onBackTap(): void {
        this._routerExtensions.back();
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
