function initMap() {
    const mexico = { lat: 19.4175572, lng: -99.0722124 };
    const map = new google.maps.Map(document.getElementById('map'), { zoom: 12, center: mexico, });
    const marker = new google.maps.Marker({ position: mexico, map: map, });
}