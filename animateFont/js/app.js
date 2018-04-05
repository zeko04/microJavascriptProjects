function brakChain(){
    let chain  = document.getElementById('chain');
    chain.innerHTML = "&#xf0c1;";

    setTimeout(function(){
        chain.innerHTML = "&#xf127;";
    }, 1000);
}

function batteryCharging(){
    let battery = document.getElementById('battery');
    battery.innerHTML = "&#xf244";

    setTimeout(function(){
        battery.innerHTML = "&#xf243";
    }, 500)
    
    /setTimeout(function(){
        battery.innerHTML = "&#xf242";
    }, 1000)

    setTimeout(function(){
        battery.innerHTML = "&#xf241";
    }, 1500)

    setTimeout(function(){
        battery.innerHTML = "&#xf240";
    }, 2000)


}
brakChain();
batteryCharging();

setInterval(batteryCharging,2500);
setInterval(brakChain, 2000);