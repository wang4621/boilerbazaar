import './Map.css';
import UniversityBookstoreImage from './UniversityBookstoreImage.jpg'
import StadiumBookstoreImage from './StadiumBookstoreImage.jpg'
import FollettsBookstoreImage from './FollettsBookstoreImage.jpg'

function Map (){

    function closestBookstore() {
        if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(positionSuccess, positionError);
           }
        else {
            alert("Geolocation not supported by this browser");
        }
    }

    function positionSuccess(position) {
        //console.log(position);
        const coordinates = position.coords;
        const universityLatitude = 40.42426180398474;
        const universityLongitude = -86.91021347670406;
        const stadiumLatitude = 40.432860768794406;
        const stadiumLongitude = -86.91493815243548;
        const follettsLattitude = 40.42405686593707;
        const follettsLongitude = -86.92522357859477;
        const universityDistance = calculateDistance(coordinates.latitude, coordinates.longitude, universityLatitude, universityLongitude);
        const stadiumDistance = calculateDistance(coordinates.latitude, coordinates.longitude, stadiumLatitude, stadiumLongitude);
        const follettsDistance = calculateDistance(coordinates.latitude, coordinates.longitude, follettsLattitude, follettsLongitude);
        if ((universityDistance < stadiumDistance) && (universityDistance < follettsDistance)) {
            alert('University Bookstore is the closest');
        }
        else if ((stadiumDistance < universityDistance) && (stadiumDistance < follettsDistance)) {
            alert('Stadium Bookstore is the closest');
        }
        else if ((follettsDistance < universityDistance) && (follettsDistance < stadiumDistance)) {
            alert('Folletts Bookstore is the closest');
        }
        else {
            alert('Unable to determine closest bookstore');
        }
    }
    
    function positionError() {
        alert("Please allow location to use this service");
    }

    function calculateDistance(lat1, lon1, lat2, lon2) {
        if ((lat1 === lat2) && (lon1 === lon2)) {
            return 0;
        }
        else {
            var radlat1 = Math.PI * lat1/180;
		    var radlat2 = Math.PI * lat2/180;
		    var theta = lon1-lon2;
		    var radtheta = Math.PI * theta/180;
		    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		    if (dist > 1) {
			    dist = 1;
		    }
		    dist = Math.acos(dist);
		    dist = dist * 180/Math.PI;
		    dist = dist * 60 * 1.1515;
		    dist = dist * 0.8684;
		    return dist;
        }
    }

    return (
        <div class="mapContainer">
            <h1 class = "mapTitle">Purdue Bookstore Locations</h1>
            <hr class= "mapDivider"></hr>
            <div class = "closestBookstoreButtonContainer">
                <button class = "closestBookstoreButton" type = "button" onClick = {closestBookstore}>Click me to locate the closest bookstore</button>
            </div>
            <h2 class = "bookstoreNames">University Bookstore</h2>
            <img class = "bookstoreImages" src={UniversityBookstoreImage} alt = "UniversityBookstoreImage"></img>
            <p class = "hoursText">
            <h3>Hours:</h3>
            Monday - Friday 9:00 AM - 5:30 PM<br/>
            Saturday 10:00 AM - 5:00 PM<br/>
            Sunday 12:00 PM - 5:00 PM</p>
            <iframe class = "googleMap" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3037.303894939288!2d-86.91240568430067!3d40.42426926310417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8812e2ae59609b13%3A0xfa4436bcfdab3352!2sUniversity%20Book%20Store%20(PurdueU)!5e0!3m2!1sen!2sus!4v1664590314364!5m2!1sen!2sus" width="400" height="300" 
            style={{
                border:0
            }} 
            allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="universityMap"></iframe>
            <h2 class = "bookstoreNames">Stadium University Bookstore</h2>
            <img class = "bookstoreImages" src={StadiumBookstoreImage} alt = "StadiumBookstoreImage"></img>
            <p class = "hoursText">
            <h3>Hours:</h3>
            Monday - Friday 9:00 AM - 5:00 PM<br/>
            Saturday 10:00 AM - 5:00 PM<br/>
            Sunday Closed</p>
            <iframe class = "googleMap" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3036.915662248585!2d-86.91709638431803!3d40.43286636258124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8812fd4d1c8bf8cb%3A0xe835210084c5b1d0!2sStadium%20University%20Book%20Store%20-%20Purdue!5e0!3m2!1sen!2sus!4v1664591193596!5m2!1sen!2sus" width="400" height="300" 
            style={{
                border:0
            }} 
            allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="universityMap"></iframe>
            <h2 class = "bookstoreNames">Follett's Purdue West Bookstore</h2>
            <img class = "bookstoreImages" src={FollettsBookstoreImage} alt = "FollettsBookstoreImage"></img>
            <p class = "hoursText">
            <h3>Hours:</h3>
            Monday - Friday 9:00 AM - 5:00 PM<br/>
            Saturday 10:00 AM - 5:00 PM<br/>
            Sunday Closed</p>
            <iframe class = "googleMap" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3037.285521461194!2d-86.9314300843182!3d40.42467616307965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8812e2cdd45f1d37%3A0xec9c0e3ee703d927!2sFollett&#39;s%20Purdue%20West%20Bookstore!5e0!3m2!1sen!2sus!4v1664591324464!5m2!1sen!2sus" width="400" height="300" 
            style={{
                border:0
            }} 
            allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="universityMap"></iframe>
        </div>
    )
}

export default Map;