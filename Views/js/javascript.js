setInterval(getbday, 1000);
async function getbday() {
    var date = getQueryStringValue('date');
    console.log();
    const response = await fetch('countdown?date=' + date);
    const nbday = await response.json();
    document.getElementById('days').innerHTML = nbday.days + "<br>Days ";
    document.getElementById('hours').innerHTML = nbday.hours + "<br>Hours ";
    document.getElementById('minutes').innerHTML = nbday.minutes + "<br>Minutes ";
    document.getElementById('seconds').innerHTML = nbday.seconds + "<br>Seconds ";
}

function getQueryStringValue(key) {
    return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}