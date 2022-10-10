import './Profile.css'
import { Avatar, CardHeader, Rating, Divider, Box, Typography, CardContent, Button, TextField, MenuItem } from '@mui/material';
import * as React from 'react';

function Profile () {
    const [isDisabled, setDisabled] = React.useState(true)
    const [value, setValue] = React.useState('Edit')
    const [location, setLocation] = React.useState('None');

    const locationChange = event => {
        console.log(event.target.value)
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
        <div className="profileDisplay">
            <Box sx={{width: '85%', height: '90%', backgroundColor: 'white', borderRadius: 5, display: 'flex', flexDirection:'column', boxShadow: 8}}>
                <CardHeader title="Settings" sx={{textAlign: 'center', height: "5%"}}/>
                <Divider variant='fullWidth' sx={{borderBottomColor: 'black'}}/>
                <div className="profileBoxDisplay">
                    <Box sx={{width: '15%', height: '100%', backgroundColor: 'whitesmoke'}} className="diffSettings">
                        <Button sx={{width: '100%'}}>Profile</Button>
                    </Box>
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
                            <TextField id="location" name="" label="Preferred Meeting Location" select value={location} disabled={isDisabled} onChange={locationChange}>
                                <MenuItem value="None">None</MenuItem>
                                <MenuItem value="Public">Public</MenuItem>
                                <MenuItem value="In front of house/apt">In front of house/apt</MenuItem>
                            </TextField>
                            <TextField type="submit" value={value}/>
                        </Box>
                    </Box>
                    <Box sx={{width: '50%', height: '100%', backgroundColor: 'whitesmoke'}} className="ratingBox">
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
                </div>
            </Box>
        </div>
    )
}
export default Profile;