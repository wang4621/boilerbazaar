import './Profile.css'
import Box from '@mui/material/Box';

function Profile () {
    return (
        <Box sx={{width: '30%', height: '100%', backgroundColor: 'gray',}}>
            <form>
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
                    <option value="public">Public</option>
                    <option value="front">In front of house/apt</option>
                </select>
                <br/>
                <input type="submit" value="Edit" />
            </form>
        </Box>
    )
}
export default Profile;