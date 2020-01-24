
param(
    $Type = 'Dev',
    $Alias = 'alias_name',
    $KeyStore = '.\build\destiny-key.keystore'
)

$Key = $Env:CHURCH;
if('Release' -eq $Type){
    $Path = "$PSScriptRoot\App_Resources\Android\src\main\AndroidManifest.xml";
    $APK = "$PSScriptRoot\platforms\android\app\build\outputs\apk\release\app-release.apk";

    [xml]$xmlDoc = New-Object system.Xml.XmlDocument;
    [xml]$xmlDoc = Get-Content $Path;

    $currentVersion = $xmlDoc.manifest.versionName;
    $versionCode = $xmlDoc.manifest.versionCode -as [int];
    $currentVersionArray = $currentVersion.Split('.');
    $Patch = $currentVersionArray | Select-Object -Last 1;
    $IntPatch = $Patch -as [int];
    $IntPatch++;
    $versionCode++;

    $FinalBuildNumber = "$($currentVersionArray[0]).$($currentVersionArray[1]).$($IntPatch)";

    $xmlDoc.manifest.versionName = $FinalBuildNumber;
    $xmlDoc.manifest.versionCode = "$($versionCode)";
    $xmlDoc.Save($Path);

    tns build android --release --key-store-path $KeyStore --key-store-password $Key --key-store-alias $Alias --key-store-alias-password $Key
    try {
        Copy-Item "$APK" -Destination "$PSScriptRoot\dist\destiny.release.$FinalBuildNumber.apk"
    }
    catch {
     Write-Error "The artifact is missing" -ErrorAction:Stop;
    }
}

#keytool -genkey -v -keystore <my-release-key>.keystore -alias <alias_name> -keyalg RSA -keysize 2048 -validity 10000
