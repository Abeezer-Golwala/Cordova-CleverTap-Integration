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
                "Phone no.": "+91977994121",
                'Email': 'abeezer@cordova.com'
            });
    CleverTap.createNotificationChannel("abtest", "abtest", "Test Channel", 5, true);
    CleverTap.initializeInbox();
    var ref = cordova.InAppBrowser.open('https://abeezerwebtest.000webhostapp.com/cordovawebview.html', '_blank', 'location=yes');
//    window.open = cordova.InAppBrowser.open;
//    ref.show();
    ref.addEventListener('message', messageCallBack);


}

function messageCallBack(params){
console.log("webview"+JSON.stringify(params));
var clevertapdata = JSON.parse(JSON.stringify(params.data));
  console.log("test"+clevertapdata.Type);
  console.log("test"+JSON.stringify(clevertapdata.Type));
  //checking the type of the data recieved from webview if its an event, onuserlogin or profile set data.
    if (JSON.stringify(clevertapdata.Type) == "\"event\""){
      console.log("test"+clevertapdata.Type);
      CleverTap.recordEventWithNameAndProps(clevertapdata.EventName,clevertapdata.Payload);
      console.log(JSON.stringify(clevertapdata.Type)+"\n"+JSON.stringify(clevertapdata.Payload));
    }
    else if (JSON.stringify(clevertapdata.Type) == "\"onuserlogin\""){
      CleverTap.onUserLogin(clevertapdata.Payload);
      console.log(JSON.stringify(clevertapdata.Type)+"\n"+JSON.stringify(clevertapdata.Payload));
    }
    else if (JSON.stringify(clevertapdata.Type) == "\"profileset\""){
      CleverTap.profileSet(clevertapdata.Payload);
      console.log(JSON.stringify(clevertapdata.Type)+"\n"+JSON.stringify(clevertapdata.Payload));
    }
    else if (JSON.stringify(clevertapdata.Type) == "\"recordChargedEventWithDetailsAndItems\""){
      CleverTap.recordChargedEventWithDetailsAndItems(clevertapdata.chargedetails, clevertapdata.items);
      console.log(JSON.stringify(clevertapdata.Type)+"\n"+JSON.stringify(clevertapdata.chargedetails)+"\n"+JSON.stringify(clevertapdata.items));
    }
    else if (JSON.stringify(clevertapdata.Type) == "\"profileSetMultiValues\""){
      CleverTap.profileSetMultiValues(clevertapdata.key, clevertapdata.value);
      console.log(JSON.stringify(clevertapdata.Type)+"\n"+JSON.stringify(clevertapdata.key)+"\n"+JSON.stringify(clevertapdata.values));
    }
    else if (JSON.stringify(clevertapdata.Type) == "\"profileRemoveMultiValue\""){
      CleverTap.profileRemoveMultiValue(clevertapdata.key, clevertapdata.value);
      console.log(JSON.stringify(clevertapdata.Type)+"\n"+JSON.stringify(clevertapdata.key)+"\n"+JSON.stringify(clevertapdata.value));
    }
    else if (JSON.stringify(clevertapdata.Type) == "\"profileAddMultiValueForKey\""){

      CleverTap.profileAddMultiValue(clevertapdata.key, clevertapdata.value);
      console.log(JSON.stringify(clevertapdata.Type)+"\n"+JSON.stringify(clevertapdata.key)+"\n"+JSON.stringify(clevertapdata.value));
    }

}
function onPush(){
    CleverTap.recordEventWithName("AbeezerPushEvent");
}
function onInboxCordova()
{
    CleverTap.recordEventWithName("Abeezergetmsg");
    CleverTap.showInbox({});
    CleverTap.createNotification();
}


function onNativeCordova()
{
    CleverTap.recordEventWithName("abeezernativedisp");
    CleverTap.getAllDisplayUnits(function(val) {
    document.getElementById("nativemsg").innerHTML =JSON.stringify(val[0].content[0].message.text).replace(/['"]+/g, '');
    document.getElementById("nativetitle").innerHTML =JSON.stringify(val[0].content[0].title.text).replace(/['"]+/g, '');
    console.log("Native Display units are "+JSON.stringify(val[0].content[0].message.text));
    });
}

