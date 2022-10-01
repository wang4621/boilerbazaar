import './Map.css';

function Map (){
    return (
        <div class="mapContainer">
            <h1 class = "mapTitle">Purdue Bookstore Locations</h1>
            <hr class= "mapDivider"></hr>
            <h2 class = "bookstoreNames">University Bookstore</h2>
            <h3 class = "hoursHeader">Hours:</h3>
            <p class = "hoursText">
            Monday - Friday 9:00 AM - 5:30 PM<br/>
            Saturday 10:00 AM - 5:00 PM<br/>
            Sunday 12:00 PM - 5:00 PM</p>
            <h2 class = "bookstoreNames">Stadium University Bookstore</h2>
            <h3 class = "hoursHeader">Hours:</h3>
            <p class = "hoursText">
            Monday - Friday 9:00 AM - 5:00 PM<br/>
            Saturday 10:00 AM - 5:00 PM<br/>
            Sunday Closed</p>
            <h2 class = "bookstoreNames">Follett's Purdue West Bookstore</h2>
            <h3 class = "hoursHeader">Hours:</h3>
            <p class = "hoursText">
            Monday - Friday 9:00 AM - 5:00 PM<br/>
            Saturday 10:00 AM - 5:00 PM<br/>
            Sunday Closed</p>
        </div>
    )
}
  
export default Map;