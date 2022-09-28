import './Profile.css'
import Box from '@mui/material/Box';

function Profile () {
    return (
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
                <option value="front">In front of house</option>
                <option selected value="coconut">Coconut</option>
                <option value="mango">Mango</option>
            </select>
            <br/>
            <input type="submit" value="Edit" />
        </form>
    )
}
export default Profile;