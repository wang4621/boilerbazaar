import "./Map.css";
import React from "react";
import UniversityBookstoreImage from "../component/Images/UniversityBookstoreImage.jpg";
import StadiumBookstoreImage from "../component/Images/StadiumBookstoreImage.jpg";
import FollettsBookstoreImage from "../component/Images/FollettsBookstoreImage.jpg";
import { Box, Button, Divider, Typography } from "@mui/material";

function Map() {
  function closestBookstore() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(positionSuccess, positionError);
    } else {
      alert("Geolocation not supported by this browser");
    }
  }

  function positionSuccess(position) {
    const coordinates = position.coords;
    const universityLatitude = 40.42426180398474;
    const universityLongitude = -86.91021347670406;
    const stadiumLatitude = 40.432860768794406;
    const stadiumLongitude = -86.91493815243548;
    const follettsLattitude = 40.42405686593707;
    const follettsLongitude = -86.92522357859477;

    //Calculate the distances from each bookstore
    const universityDistance = calculateDistance(
      coordinates.latitude,
      coordinates.longitude,
      universityLatitude,
      universityLongitude
    );
    const stadiumDistance = calculateDistance(
      coordinates.latitude,
      coordinates.longitude,
      stadiumLatitude,
      stadiumLongitude
    );
    const follettsDistance = calculateDistance(
      coordinates.latitude,
      coordinates.longitude,
      follettsLattitude,
      follettsLongitude
    );

    //Compare distances
    if (
      universityDistance < stadiumDistance &&
      universityDistance < follettsDistance
    ) {
      document.getElementById("closestBookstoreText").innerHTML =
        "University Bookstore is the closest! (" +
        universityDistance.toFixed(1) +
        " miles)";
    } else if (
      stadiumDistance < universityDistance &&
      stadiumDistance < follettsDistance
    ) {
      document.getElementById("closestBookstoreText").innerHTML =
        "Stadium University Bookstore is the closest! (" +
        stadiumDistance.toFixed(1) +
        " miles)";
    } else if (
      follettsDistance < universityDistance &&
      follettsDistance < stadiumDistance
    ) {
      document.getElementById("closestBookstoreText").innerHTML =
        "Follett's Purdue West Bookstore is the closest! (" +
        follettsDistance.toFixed(1) +
        " miles)";
    } else if ((universityDistance === stadiumDistance) === follettsDistance) {
      document.getElementById("closestBookstoreText").innerHTML =
        "All bookstores are the closest! (" +
        universityDistance.toFixed(1) +
        " miles)";
    } else if (universityDistance === stadiumDistance) {
      document.getElementById("closestBookstoreText").innerHTML =
        "University Bookstore and Stadium University Bookstore are the closest! (" +
        universityDistance.toFixed(1) +
        " miles)";
    } else if (universityDistance === follettsDistance) {
      document.getElementById("closestBookstoreText").innerHTML =
        "University Bookstore and Follett's Purdue West Bookstore are the closest! (" +
        universityDistance.toFixed(1) +
        " miles)";
    } else if (stadiumDistance === follettsDistance) {
      document.getElementById("closestBookstoreText").innerHTML =
        "Stadium University Bookstore and Follett's Purdue West Bookstore are the closest! (" +
        stadiumDistance.toFixed(1) +
        " miles)";
    } else {
      document.getElementById("closestBookstoreText").innerHTML =
        "Unable to determine the closest bookstore";
    }
  }

  function positionError() {
    alert("Please allow location to use this service");
  }

  //Calculate the distance between two coordinates
  function calculateDistance(lat1, lon1, lat2, lon2) {
    if (lat1 === lat2 && lon1 === lon2) {
      return 0;
    } else {
      const radlat1 = (Math.PI * lat1) / 180;
      const radlat2 = (Math.PI * lat2) / 180;
      const theta = lon1 - lon2;
      const radtheta = (Math.PI * theta) / 180;
      var dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = (dist * 180) / Math.PI;
      dist = dist * 60 * 1.1515;
      return dist;
    }
  }

  function dynamicHours() {
    var currentDate = new Date();
    var weekday = currentDate.getDay();

    switch (weekday) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        document.getElementById("universityHours").innerHTML = `<h3>Hours:</h3>
                <b>Monday - Friday 9:00 AM - 5:30 PM</b><br/>
                Saturday 10:00 AM - 5:00 PM<br/>
                Sunday 12:00 PM - 5:00 PM`;
        document.getElementById("stadiumHours").innerHTML = `<h3>Hours:</h3>
                <b>Monday - Friday 9:00 AM - 5:00 PM</b><br/>
                Saturday 10:00 AM - 5:00 PM<br/>
                Sunday Closed`;
        document.getElementById("follettsHours").innerHTML = `<h3>Hours:</h3>
                <b>Monday - Friday 9:00 AM - 5:00 PM</b><br/>
                Saturday 10:00 AM - 5:00 PM<br/>
                Sunday Closed`;
        break;
      case 6:
        document.getElementById("universityHours").innerHTML = `<h3>Hours:</h3>
                Monday - Friday 9:00 AM - 5:30 PM<br/>
                <b>Saturday 10:00 AM - 5:00 PM</b><br/>
                Sunday 12:00 PM - 5:00 PM`;
        document.getElementById("stadiumHours").innerHTML = `<h3>Hours:</h3>
                Monday - Friday 9:00 AM - 5:00 PM<br/>
                <b>Saturday 10:00 AM - 5:00 PM</b><br/>
                Sunday Closed`;
        document.getElementById("follettsHours").innerHTML = `<h3>Hours:</h3>
                Monday - Friday 9:00 AM - 5:00 PM<br/>
                <b>Saturday 10:00 AM - 5:00 PM</b><br/>
                Sunday Closed`;
        break;
      case 0:
        document.getElementById("universityHours").innerHTML = `<h3>Hours:</h3>
                Monday - Friday 9:00 AM - 5:30 PM<br/>
                Saturday 10:00 AM - 5:00 PM<br/>
                <b>Sunday 12:00 PM - 5:00 PM</b>`;
        document.getElementById("stadiumHours").innerHTML = `<h3>Hours:</h3>
                Monday - Friday 9:00 AM - 5:00 PM<br/>
                Saturday 10:00 AM - 5:00 PM<br/>
                <b>Sunday Closed</b>`;
        document.getElementById("follettsHours").innerHTML = `<h3>Hours:</h3>
                Monday - Friday 9:00 AM - 5:00 PM<br/>
                Saturday 10:00 AM - 5:00 PM<br/>
                <b>Sunday Closed</b>`;
        break;
      default:
        document.getElementById("universityHours").innerHTML = `<h3>Hours:</h3>
                Monday - Friday 9:00 AM - 5:30 PM<br/>
                Saturday 10:00 AM - 5:00 PM<br/>
                Sunday 12:00 PM - 5:00 PM`;
        document.getElementById("stadiumHours").innerHTML = `<h3>Hours:</h3>
                Monday - Friday 9:00 AM - 5:00 PM<br/>
                Saturday 10:00 AM - 5:00 PM<br/>
                Sunday Closed`;
        document.getElementById("follettsHours").innerHTML = `<h3>Hours:</h3>
                Monday - Friday 9:00 AM - 5:00 PM<br/>
                Saturday 10:00 AM - 5:00 PM<br/>
                Sunday Closed`;
        break;
    }
  }

  const scrollUniversity = () => {
    let uni = document.getElementById("uni");
    uni.scrollIntoView({ behavior: "smooth" });
  };

  const scrollStadium = () => {
    let stadium = document.getElementById("stadium");
    stadium.scrollIntoView({ behavior: "smooth" });
  };

  const scrollPurdue = () => {
    let purdue = document.getElementById("purdue");
    purdue.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    dynamicHours();
  }, []);

  return (
    <div className="mapDisplay">
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Box
          sx={{
            width: "28%",
            height: "100%",
            backgroundColor: "var(--primary-color)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* <h1 className="mapTitle">Purdue Bookstore Locations</h1> */}
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", textAlign: "center", padding: "10px" }}
          >
            Purdue Bookstore Locations
          </Typography>
          <Divider
            variant="middle"
            sx={{ borderBottomColor: "var(--text-color)"}}
          />
          {/* <hr className="mapDivider"></hr> */}
          <Box
            sx={{
              height: "93%",
              display:'flex',
              flexDirection:'column',
            }}
          >
            <Button onClick={scrollUniversity}  sx={{ width: "100%", fontWeight:'bold'}}>
              University Bookstore
            </Button>
            <Button onClick={scrollStadium} sx={{ width: "100%", fontWeight:'bold'}}>
              Stadium University Bookstore
            </Button>
            <Button onClick={scrollPurdue} sx={{ width: "100%", fontWeight:'bold'}}>
              Follett's Purdue West Bookstore
            </Button>
            <Button onClick={closestBookstore} sx={{ width: "100%", fontWeight:'bold'}}>
              Click me to locate the closest bookstore
            </Button>
            {/* <div className="closestBookstoreButtonContainer">
            <button
              className="closestBookstoreButton"
              type="button"
              onClick={closestBookstore}
            >
              Click me to locate the closest bookstore
            </button>
          </div> */}
            {/* <p className="closestBookstoreText" id="closestBookstoreText"></p> */}
            <Typography id="closestBookstoreText" sx={{textAlign:'center'}}/>
          </Box>
        </Box>
        <Box
          sx={{
            height: "100%",
            width: "72%",
            display: "flex",
            flexDirection: "column",
            // justifyContent: "space-evenly",
            overflowY: "auto",
          }}
          className="scrollBar"
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
            }}
            id="uni"
          >
            <Box
              sx={{
                width: "35%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              {/* <h2 className="bookstoreNames">University Bookstore</h2> */}
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                University Bookstore
              </Typography>
              <img
                className="bookstoreImages"
                src={UniversityBookstoreImage}
                alt="UniversityBookstoreImage"
              />
            </Box>
            <Box
              sx={{
                width: "35%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p className="hoursText" id="universityHours">
                <h3>Hours:</h3>
                Monday - Friday 9:00 AM - 5:30 PM
                <br />
                Saturday 10:00 AM - 5:00 PM
                <br />
                Sunday 12:00 PM - 5:00 PM
              </p>
            </Box>
            <Box
              sx={{
                width: "30%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <iframe
                className="googleMap"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3037.303894939288!2d-86.91240568430067!3d40.42426926310417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8812e2ae59609b13%3A0xfa4436bcfdab3352!2sUniversity%20Book%20Store%20(PurdueU)!5e0!3m2!1sen!2sus!4v1664590314364!5m2!1sen!2sus"
                width="500"
                height="400"
                style={{
                  border: 0,
                }}
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                title="universityMap"
              ></iframe>
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
            }}
            id="stadium"
          >
            <Box
              sx={{
                width: "35%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              {/* <h2 className="bookstoreNames">Stadium University Bookstore</h2> */}
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Stadium University Bookstore
              </Typography>
              <img
                className="bookstoreImages"
                src={StadiumBookstoreImage}
                alt="StadiumBookstoreImage"
              />
            </Box>
            <Box
              sx={{
                width: "35%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p className="hoursText" id="stadiumHours">
                <h3>Hours:</h3>
                Monday - Friday 9:00 AM - 5:00 PM
                <br />
                Saturday 10:00 AM - 5:00 PM
                <br />
                Sunday Closed
              </p>
            </Box>
            <Box
              sx={{
                width: "30%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <iframe
                className="googleMap"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3036.915662248585!2d-86.91709638431803!3d40.43286636258124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8812fd4d1c8bf8cb%3A0xe835210084c5b1d0!2sStadium%20University%20Book%20Store%20-%20Purdue!5e0!3m2!1sen!2sus!4v1664591193596!5m2!1sen!2sus"
                width="500"
                height="400"
                style={{
                  border: 0,
                }}
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                title="universityMap"
              ></iframe>
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
            }}
            id="purdue"
          >
            <Box
              sx={{
                width: "35%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              {/* <h2 className="bookstoreNames">Follett's Purdue West Bookstore</h2> */}
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Follett's Purdue West Bookstore
              </Typography>
              <img
                className="bookstoreImages"
                src={FollettsBookstoreImage}
                alt="FollettsBookstoreImage"
              ></img>
            </Box>
            <Box
              sx={{
                width: "35%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p className="hoursText" id="follettsHours">
                <h3>Hours:</h3>
                Monday - Friday 9:00 AM - 5:00 PM
                <br />
                Saturday 10:00 AM - 5:00 PM
                <br />
                Sunday Closed
              </p>
            </Box>
            <Box
              sx={{
                width: "30%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <iframe
                className="googleMap"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3037.285521461194!2d-86.9314300843182!3d40.42467616307965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8812e2cdd45f1d37%3A0xec9c0e3ee703d927!2sFollett&#39;s%20Purdue%20West%20Bookstore!5e0!3m2!1sen!2sus!4v1664591324464!5m2!1sen!2sus"
                width="500"
                height="400"
                style={{
                  border: 0,
                }}
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                title="universityMap"
              ></iframe>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default Map;
