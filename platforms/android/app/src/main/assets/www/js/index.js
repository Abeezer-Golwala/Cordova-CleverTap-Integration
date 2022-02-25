document.addEventListener('deviceready', onDeviceReady, false);
document.getElementById("btn").addEventListener("click",onPush);
document.getElementById("inbox").addEventListener("click",onInboxCordova);
document.getElementById("native").addEventListener("click",onNativeCordova);
function onDeviceReady() {
    // Cordova is now initialized. Have fun!
    CleverTap.setDebugLevel(3);
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
    CleverTap.onUserLogin ({
                'Name': 'Abeezer',
    //          'Identity': '9766609',
                "Phone no.": +91977994121,
                'Email': 'abeezer@cordova.com'
            });
    CleverTap.createNotificationChannel("abtest", "abtest", "Test Channel", 5, true);
    CleverTap.initializeInbox();
}
function onPush(){
    CleverTap.recordEventWithName("AbeezerPushEvent");
}
function onInboxCordova()
{
    CleverTap.recordEventWithName("Abeezergetmsg");
    CleverTap.showInbox({});
}

//function onCleverTapDisplayUnitsLoaded() {
//    console.log("onCleverTapDisplayUnitsLoaded");
//  //CleverTap.getDisplayUnitForId(function(val) {console.log("Native Display unit is "+JSON.stringify(val));});
//    CleverTap.getAllDisplayUnits(function(val) {console.log("Native Display units are "+JSON.stringify(val));});
//}

function onNativeCordova()
{
    CleverTap.recordEventWithName("abeezernativedisp");
    CleverTap.getAllDisplayUnits(function(val) {
    document.getElementById("nativemsg").innerHTML =JSON.stringify(val[0].content[0].message.text).replace(/['"]+/g, '');
    document.getElementById("nativetitle").innerHTML =JSON.stringify(val[0].content[0].title.text).replace(/['"]+/g, '');
    console.log("Native Display units are "+JSON.stringify(val[0].content[0].message.text));
    });
}

