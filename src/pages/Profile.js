import { Avatar, CardHeader, Rating, Divider, Box, Typography, TextField, MenuItem } from '@mui/material';
import * as React from 'react';
import './Profile.css'
import $ from 'jquery';
import { styled  } from "@mui/material/styles";

function Profile() {
    const [isDisabled, setDisabled] = React.useState(true)
    const [value, setValue] = React.useState('Edit')
    const [location, setLocation] = React.useState('None');
    const [preferredName, setPreferredName] = React.useState('')
    const lastName = 'Wang'

    const locationChange = event => {
        setLocation(event.target.value)
    }

    const editOrSaveProfile = event => {
        setDisabled(!isDisabled)
        if (value === "Edit") {
            setValue('Save')
        } else if (value === "Save") {
            var name = document.getElementById('preferredName').value
            var major = document.getElementById('major').value
            var puid = document.getElementById('puid').value
            var profileData = {"puid": puid, "preferredName": name, "major": major, "preferredMeeting": location}
            profileData = "\""+JSON.stringify(profileData).replaceAll('"', '\\"')+"\""
            console.log(profileData)
            $.ajax({
                url: 'https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/profile',
                type: 'PUT',
                data: profileData,
                datatype: 'json',
                contentType: 'application/json',
                success: function (result) {
                    alert(JSON.stringify(result))
                },
                error: function (result) {
                    alert(JSON.stringify(result));
                }
            });
            setValue('Edit')
        }
        event.preventDefault()
    }

    const CustomDisabledTextField = styled (TextField)(() => ({
        ".MuiInputBase-input.Mui-disabled": {
            WebkitTextFillColor: "var(--text-color)",
            color: "var(--text-color)",
        }
      }));

    return (
        <Box className="profileDisplay">
            <Box sx={{width: '35%', height: '100%', backgroundColor: 'var(--secondary-color)', display:'flex', flexDirection:'column'}}>
                <CardHeader sx={{textAlign:"center", height:'5%'}} title="General"/>
                <Divider variant='middle' sx={{borderBottomColor: 'rgb(202, 199, 199)'}}/>
                <br/>
                <Box sx={{'& > :not(style)': { m: 1.5 }, height: "95%", overflowY: 'auto'}} component="form" autoComplete="off" className="profileFormDisplay" onSubmit={editOrSaveProfile} id="profileForm">
                    <CustomDisabledTextField id="firstName" label="First Name" disabled value="Jeff"/>
                    <CustomDisabledTextField id="preferredName" label="Preferred Name" disabled={isDisabled} value={preferredName}/>
                    <CustomDisabledTextField id="lastName" label="Last Name" disabled value={lastName}/>
                    <CustomDisabledTextField id="puid" label="PUID" disabled value="0031888129"/>
                    <CustomDisabledTextField id="major" label="Major" disabled={isDisabled}/>
                    <CustomDisabledTextField id="location" label="Preferred Meeting Location" select value={location} disabled={isDisabled} onChange={locationChange}>
                        <MenuItem value="None">None</MenuItem>
                        <MenuItem value="Public">Public</MenuItem>
                        <MenuItem value="In front of house/apt">In front of house/apt</MenuItem>
                    </CustomDisabledTextField>
                    <TextField type="submit" value={value}/>
                </Box>
            </Box>
            <Box sx={{width: '65%', height: '100%', backgroundColor: 'var(--secondary-color)'}} className="ratingBox">
                <Typography variant="h6" color="var(--text-color)" sx={{textAlign:'center'}}>
                    <Avatar sx={{ width: 128, height: 128 }}/>
                    Jeff {lastName}
                </Typography>
                <br/>
                <Typography variant="h6" color="var(--text-color)">Rating</Typography>
                <Rating name="read-only" readOnly size="large"/>
                <br/><br/>
                <Typography variant="h6" color="var(--text-color)">
                    Completed Purchases:
                    <Typography display="inline">&nbsp;</Typography>
                    <Typography variant="h6" color="var(--text-color)" display="inline" id="purchases">
                        5
                    </Typography>
                </Typography>
                <Typography variant="h6" color="var(--text-color)">
                    Completed Sales:
                    <Typography display="inline">&nbsp;</Typography>
                    <Typography variant="h6" color="var(--text-color)" display="inline" id="sales">
                        1
                    </Typography>
                </Typography>
            </Box>       
        </Box>
    )
}

export default Profile;