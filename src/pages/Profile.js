import './Profile.css'
import { Avatar, Card, CardHeader, Rating, Divider, Box, Typography, CardContent, Button, TextField, MenuItem } from '@mui/material';

function editProfile(e) {

    e.preventDefault()
}

// function saveProfile() {

// }

function Profile () {
    return (
        <div className="profileDisplay">
            <Card sx={{width: '80%', height: '90%', backgroundColor: 'white', borderRadius: 5}} elevation={24}>
                <CardHeader title="Settings" sx={{textAlign: 'center'}}></CardHeader>
                <Divider variant='fullWidth' sx={{borderBottomColor: 'black'}}/>
                <div className="profileBoxDisplay">
                    <Box sx={{width: '15%', height: '100%', backgroundColor: 'whitesmoke'}} className="diffSettings">
                        <div className="buttonDisplay">
                            <Button sx={{width: '100%'}} size="large">Profile</Button>
                        </div>
                    </Box>
                    <Box sx={{width: '35%', height: '100%', backgroundColor: 'whitesmoke'}}>
                        <CardHeader sx={{textAlign:"center"}} title="General"/>
                        <Divider variant='middle' sx={{borderBottomColor: 'rgb(202, 199, 199)'}}/>
                        {/* <CardContent sx={{height: '88%'}}className="profileFormDisplay">
                            <form onSubmit={event => editProfile(event)}>
                                <Typography variant="body1" color="black">First Name</Typography>
                                <input type="text" disabled/>
                                <br/><br/>
                                <Typography variant="body1" color="black">Preferred Name</Typography>
                                <input type="text" disabled/>
                                <br/><br/>
                                <Typography variant="body1" color="black">Last Name</Typography>
                                <input type="text" disabled/>
                                <br/><br/>
                                <Typography variant="body1" color="black">Major</Typography>
                                <input type="text" disabled/>
                                <br/><br/>
                                <Typography variant="body1" color="black">Preferred Meeting Location</Typography>
                                <select disabled>
                                    <option value="none" selected>No preference</option>
                                    <option value="public">Public</option>
                                    <option value="front">In front of house/apt</option>
                                </select>
                                <br/><br/>
                                <input type="submit" value="Edit" id="edit"/>
                            </form>
                        </CardContent> */}
                        <Box sx={{'& > :not(style)': { m: 1 }, height: "92%", overflowY: 'scroll'}} component="form" autoComplete="off" className="profileFormDisplay">
                            <TextField id="" label="First Name" disabled readOnly/>
                            <TextField id="" label="Preferred Name" disabled/>
                            <TextField id="" label="Last Name" disabled/>
                            <TextField id="" label="Major" disabled/>
                            <TextField id="" name="" label="Preferred Meeting Location" select defaultValue="None" disabled>
                                <MenuItem value="None">None</MenuItem>
                                <MenuItem value="Public">Public</MenuItem>
                                <MenuItem value="Front">In front of house/apt</MenuItem>
                            </TextField>
                            <TextField id="edit" type="submit" value="Edit"/>
                        </Box>
                    </Box>
                    <Box sx={{width: '50%', height: '100%', backgroundColor: 'whitesmoke'}} className="ratingBox">
                        <Avatar sx={{ width: 128, height: 128 }}/>
                        <Typography variant="h6" color="black">Profile Picture goes here</Typography>
                        <Typography variant="h6" color="black">Name goes here</Typography>
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
            </Card>
        </div>
    )
}
export default Profile;