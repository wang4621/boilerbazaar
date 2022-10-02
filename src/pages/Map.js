import './Map.css';

function Map (){
    return (
        <div class="mapContainer">
            <div class = "mapHeader">
                <h1 class = "mapTitle">Purdue Bookstore Locations</h1>
                <hr class= "mapDivider"></hr>
            </div>
            <h2 class = "universityBookstoreTitle">University Bookstore</h2>
            <div class = "universityBookstoreInfo">
                <h3 class = "hoursHeader">Hours:</h3>
                <p class = "hoursText">
                Monday - Friday 9:00 AM - 5:30 PM<br/>
                Saturday 10:00 AM - 5:00 PM<br/>
                Sunday 12:00 PM - 5:00 PM</p>
            </div>
            <iframe class = "universityGoogleMap" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3037.303894939288!2d-86.91240568430067!3d40.42426926310417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8812e2ae59609b13%3A0xfa4436bcfdab3352!2sUniversity%20Book%20Store%20(PurdueU)!5e0!3m2!1sen!2sus!4v1664590314364!5m2!1sen!2sus" width="400" height="300" 
            style={{
                border:0
            }} 
            allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="universityMap"></iframe>
            <div class = "stadiumBookstoreInfo">
                <h2 class = "stadiumBookstoreTitle">Stadium University Bookstore</h2>
            </div>
            <div class = "follettsBookstoreInfo">
                <h2 class = "follettsBookstoreTitle">Follett's Purdue West Bookstore</h2>
            </div>
        </div>
    )
}
  
export default Map;