function httpPost(event) {
    var xmlhttp = new XMLHttpRequest();
    var formData = new FormData(document.getElementById('searchForm'));

    event.preventDefault();

    xmlhttp.open('POST', '/api/search', true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            displayResults(JSON.parse(this.responseText));
        }
    };
    xmlhttp.send(JSON.stringify({
        'searchString': formData.get('searchString')
    }));
}

function displayResults(resultObj) {
    document.getElementById('searchesList').innerHTML = resultObj.searches;
    
}