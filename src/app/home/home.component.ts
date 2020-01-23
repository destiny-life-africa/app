import { Component, OnInit } from "@angular/core";
import { DataService } from "../shared/data.service";
// import { TNSPlayer } from 'nativescript-audio-player';

@Component({
    selector: "Home",
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
    items: Array<any>;
    // private _player: TNSPlayer;

    constructor(private _itemService: DataService) {
        // this._player = new TNSPlayer();
        // this._player.debug = true; // set true to enable TNSPlayer console logs for debugging.
        // this._player
        //     .initFromUrl({
        //         audioFile: 'https://dlcmobileapp.blob.core.windows.net/faith-series/Part%201%20-%20I%20want%20to%20believe%20in%20God%20October%202019.mp3', // ~ = app directory
        //         loop: false,
        //         completeCallback: this._trackComplete.bind(this),
        //         errorCallback: this._trackError.bind(this)
        //     })
        //     .then(() => {
        //         this._player.getAudioTrackDuration().then(duration => {
        //             // iOS: duration is in seconds
        //             // Android: duration is in milliseconds
        //             console.log(`song duration:`, duration);
        //         });
        //     });
    }

    ngOnInit(): void {
        this._itemService.getSeries().subscribe((data: any) => {
            data.forEach((item: any) => {
                const t = this.camelize(item.name);
                item.name = t;
                console.log(item.name);
            });
            this.items = data;
        });
    }
    camelize(text) {
        const array = text.split(' ');
        let sentence = '';
        array.forEach((word: any) => {
            word = word ? word.charAt(0).toUpperCase() + word.substr(1).toLowerCase() : '';
            sentence += ' ';
            sentence += word;
            console.log(word);
         });
        // text = text.replace(/[-_\s.]+(.)?/g, (_, c) => c ? c.toUpperCase() : ' ');
        return sentence; // text.substr(0, 1).toLowerCase() + text.substr(1);
    }
    // public togglePlay() {
    //     if (this._player.isAudioPlaying()) {
    //         this._player.pause();
    //     } else {
    //         this._player.play();
    //     }
    // }

    // private _trackComplete(args: any) {
    //     console.log('reference back to player:', args.player);
    //     // iOS only: flag indicating if completed successfully
    //     console.log('whether song play completed successfully:', args.flag);
    // }

    // private _trackError(args: any) {
    //     console.log('reference back to player:', args.player);
    //     console.log('the error:', args.error);
    //     // Android only: extra detail on error
    //     console.log('extra info on the error:', args.extra);
    // }
}
