function pad(num) {
    if (num < 10) {
        return "0" + num
    }
    return "" + num
}
function updateHomeClock() {
    var client = new Date();
    var hours = ServerDate.getHours();
    period = "<span> am</span>";
    if (hours >= 12) {
        hours -= 12;
        period = "<span> pm</span>"
    }
    if (hours == 0) {
        hours = 12
    }
    document.getElementById("servertime").innerHTML = hours + ":" + pad(ServerDate.getMinutes()) + ":" + pad(ServerDate.getSeconds()) + period
}
function updateSyncNote() {
    var client = new Date();
    var offset = Math.abs(ServerDate - client);
    var syncNoteElem = document.getElementById("syncnote");
    console.log("Updating syncnote at " + client.toString() + ", offset is " + offset);
    if (offset < 1000) {
        syncNoteElem.innerHTML = "Congratulations, your clock is accurate!";
        syncNoteElem.className = "green"
    } else if (offset <= 60 * 1000) {
        syncNoteElem.innerHTML = "Your clock is reasonably accurate, but you may still see problems in timing-critical applications.";
        syncNoteElem.className = "yellow"
    } else {
        syncNoteElem.innerHTML = "Your clock does <em>not</em> appear to be synchronized.  You may see problems in timing-sensitive applications.";
        syncNoteElem.className = "red"
    }
}
function updateClocks() {
    var client = new Date();
    document.getElementById("server").innerHTML = "<span class=\"hidephone\">" + ServerDate.toDateString() + "</span> " + pad(ServerDate.getHours()) + ":" + pad(ServerDate.getMinutes()) + ":" + pad(ServerDate.getSeconds()) + "." + pad(ServerDate.getMilliseconds() / 10 | 0);
    document.getElementById("client").innerHTML = "<span class=\"hidephone\">" + client.toDateString() + "</span> " + pad(client.getHours()) + ":" + pad(client.getMinutes()) + ":" + pad(client.getSeconds()) + "." + pad(client.getMilliseconds() / 10 | 0)
}
function updateMetaData(firstRun) {
    var client = new Date();
    var waitText = "";
    if (firstRun == true) {
        waitText = " (refining &hellip; please wait)"
    }
    var offset = ServerDate - client;
    console.log("Updating metadata at " + client.toString() + ", offset is " + offset);
    document.getElementById("timezone").innerHTML = client.toTimeString().replace(/^[\d:]+ /, '').replace(/\(([A-Z]{3})\)/, '(<a href="https://duckduckgo.com/?q=$1%20time%20zone">$1</a>)');
    if (offset < 10000) {
        document.getElementById("offset").innerHTML = offset + " ms" + waitText
    } else {
        document.getElementById("offset").innerHTML = (offset / 1000) + " s" + waitText
    }
    document.getElementById("delay").innerHTML = ServerDate.getPrecision() + " ms"
}
function resetAmortization() {
    ServerDate.amortizationThreshold = 2000;
    ServerDate.amortizationRate = 50;
    console.log("Set clock amortization threshold/rate to " + ServerDate.amortizationThreshold + "/" + ServerDate.amortizationRate)
}
