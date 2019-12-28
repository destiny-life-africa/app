param(
    [string]$Root
)
$KeyStorePassword = "";
$KeyStorePath = "";

Set-Location "$($Root)";
tns build android --release --key-store-path <path-to-your-keystore> --key-store-password <your-key-store-password> --key-store-alias <your-alias-name> --key-store-alias-password <your-alias-password>
# ionic cordova build --release android
# ionic cordova build android --prod --release
Set-Location "$($Root)";
