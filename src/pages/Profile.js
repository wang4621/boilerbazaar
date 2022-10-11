import { Avatar, CardHeader, Rating, Divider, Box, Typography, TextField, MenuItem } from '@mui/material';
import * as React from 'react';
import './Profile.css'

function Profile() {
    const [isDisabled, setDisabled] = React.useState(true)
    const [value, setValue] = React.useState('Edit')
    const [location, setLocation] = React.useState('None');

    const locationChange = event => {
        setLocation(event.target.value)
    }

    const editOrSaveProfile = event => {
        setDisabled(!isDisabled)
        if (value === "Edit") {
            setValue('Save')
        } else if (value === "Save") {
            console.log(document.getElementById('preferredName').value)
            console.log(document.getElementById('major').value)
            console.log(location)
            setValue('Edit')
        }
        event.preventDefault()
    }

    return (
        <Box sx={{width: '85%', height: '100%', display: 'flex', flexDirection:'row'}}>
            <Box sx={{width: '35%', height: '100%', backgroundColor: 'whitesmoke', display:'flex', flexDirection:'column'}}>
                <CardHeader sx={{textAlign:"center", height:'5%'}} title="General"/>
                <Divider variant='middle' sx={{borderBottomColor: 'rgb(202, 199, 199)'}}/>
                <br/>
                <Box sx={{'& > :not(style)': { m: 1.5 }, height: "95%", overflowY: 'auto'}} component="form" autoComplete="off" className="profileFormDisplay" onSubmit={editOrSaveProfile} id="profileForm">
                    <TextField id="firstName" label="First Name" disabled value="Jeff"></TextField>
                    <TextField id="preferredName" label="Preferred Name" disabled={isDisabled}/>
                    <TextField id="lastName" label="Last Name" disabled value="Wang"/>
                    <TextField id="puid" label="PUID" disabled value="0031888129"/>
                    <TextField id="major" label="Major" disabled={isDisabled}/>
                    <TextField id="location" label="Preferred Meeting Location" select value={location} disabled={isDisabled} onChange={locationChange}>
                        <MenuItem value="None">None</MenuItem>
                        <MenuItem value="Public">Public</MenuItem>
                        <MenuItem value="In front of house/apt">In front of house/apt</MenuItem>
                    </TextField>
                    <TextField type="submit" value={value}/>
                </Box>
            </Box>
            <Box sx={{width: '65%', height: '100%', backgroundColor: 'whitesmoke'}} className="ratingBox">
                <Typography variant="h6" color="black" sx={{textAlign:'center'}}>
                    <Avatar sx={{ width: 128, height: 128 }}/>
                    Jeff Wang
                </Typography>
                <br/>
                <Typography variant="h6" color="black">Rating</Typography>
                <Rating name="read-only" readOnly size="large"/>
                <br/><br/>
                <Typography variant="h6" color="black">
                    Completed Purchases:
                    <Typography display="inline">&nbsp;</Typography>
                    <Typography variant="h6" color="black" display="inline" id="purchases">
                        5
                    </Typography>
                </Typography>
                <Typography variant="h6" color="black">
                    Completed Sales:
                    <Typography display="inline">&nbsp;</Typography>
                    <Typography variant="h6" color="black" display="inline" id="sales">
                        1
                    </Typography>
                </Typography>
            </Box>       
        </Box>
    )
}

export default Profile;