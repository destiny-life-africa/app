import { Component, OnInit } from "@angular/core";
const firebase = require("nativescript-plugin-firebase");
const dialogs = require("ui/dialogs");
@Component({
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent implements OnInit {

    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        firebase.init({
            // Optionally pass in properties for database, authentication and cloud messaging,
            // see their respective docs.
            showNotificationsWhenInForeground: true,
            showNotifications: true,
            onPushTokenReceivedCallback: function(token) {
                console.log("Firebase push token: " + token);
              },
              onMessageReceivedCallback: (message: any) => {
                console.log(`Title: ${message.title}`);
                console.log(`Body: ${message.body}`);
                // if your server passed a custom property called 'foo', then do this:
                console.log(`Value of 'foo': ${message.data.foo}`);
                dialogs.alert({
                    title: "Push message: " + (message.title !== undefined ? message.title : ""),
                    message: JSON.stringify(message),
                    okButtonText: "W00t!"
                  });
              }
          }).then(
            () => {
              console.log("firebase.init done");
            },
            error => {
              console.log(`firebase.init error: ${error}`);
            }
          );
          firebase.getCurrentPushToken().then((token: string) => {
            // may be null if not known yet
            console.log(`Current push token: ${token}`);
          });
    }
}
