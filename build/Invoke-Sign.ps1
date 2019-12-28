param(
    [string]$Root,
    [string]$Application,
    [string]$Keystore = "destiny-key.keystore",
    [string]$Apk = "app-release-unsigned.apk"
)

Set-Location "$($Root)/$($Application)";
# keytool -export -rfc
#   -keystore your-upload-keystore.jks
#   -alias upload-alias
#   -file output_upload_certificate.pem

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore "$($Keystore)" "$($Apk)" alias_name -file output_upload_certificate.pem
Set-Location "$($Root)";