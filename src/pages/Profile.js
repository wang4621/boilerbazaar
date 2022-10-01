import './Profile.css'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader';
// import Rating from '@mui/material/Rating';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

function editProfile() {

}

// function saveProfile() {

// }

function Profile () {
    return (
        <div className="profileDisplay">
            <Card sx={{width: '80%', height: '90%', backgroundColor: 'lightgrey', borderRadius: 5}} elevation={24}>
                <CardHeader title="Profile" sx={{textAlign: 'center'}}></CardHeader>
                <Divider variant='fullWidth' sx={{borderBottomColor: 'black'}}/>
                <div className="profileBoxDisplay">
                    <Box sx={{width: '50%', height: '92%', backgroundColor: 'rgb(223, 223, 223)'}} className="profileFormDisplay">
                        <div className="profileFormDisplay">
                            <form onSubmit={editProfile}>
                                <label>First Name:</label>
                                <input type="text" disabled/>
                                <br/>
                                <label>Preferred Name:</label>
                                <input type="text"/>
                                <br/>
                                <label>Last Name:</label>
                                <input type="text" disabled/>
                                <br/>
                                <label>Major:</label>
                                <input type="text"/>
                                <br/>
                                <label>Preferred Meeting Location:</label>
                                <select>
                                    <option value="none" selected>No preference</option>
                                    <option value="public">Public</option>
                                    <option value="front">In front of house/apt</option>
                                </select>
                                <br/>
                                <input type="submit" value="Edit" />
                            </form>
                        </div>
                    </Box>
                    <Box sx={{width: '50%', height: '92%', backgroundColor: 'black'}} className="profileFormDisplay">
                        
                    </Box>
                </div>
            </Card>
        </div>
    )
}
export default Profile;