# Parameter help description
param(
    [string]$Root,
    [string]$Application,
    [string]$Apk = "app-release-unsigned.apk",
    [string]$OutputApk = "DestinyLifeChurch.alpha.apk"
)
~/Library/Android/sdk/build-tools/28.0.3/zipalign -v 4 "$($Root)/$($Application)/platforms/android/app/build/outputs/apk/release/$($Apk)" "$($Root)/dist/$($OutputApk)";