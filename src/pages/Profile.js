import './Profile.css'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader';
import Rating from '@mui/material/Rating';
import Divider from '@mui/material/Divider';

function editProfile() {

}

function saveProfile() {

}

function Profile () {
    return (
        <div className="profileDisplay">
            <Card sx={{width: '80%', height: '90%', backgroundColor: 'lightgrey', borderRadius: 5}} elevation={24}>
                <CardHeader title="Profile"></CardHeader>
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
            </Card>
        </div>
    )
}
export default Profile;