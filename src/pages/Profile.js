function Profile () {
    return (
        <form>
            <label>
                First Name:
                <input type="text" disabled/>
            </label>
            <br/>
            <label>
                Preferred Name:
                <input type="text"/>
            </label>
            <br/>
            <label>
                Last Name:
                <input type="text" disabled/>
            </label>
            <br/>
            <label>
                Major:
                <input type="text"/>
            </label>
            <br/>
            <label>
                Preferred Meeting Location:
                <select>
                    <option value="grapefruit">Grapefruit</option>
                    <option value="lime">Lime</option>
                    <option selected value="coconut">Coconut</option>
                    <option value="mango">Mango</option>
                </select>
            </label>
            <br/>
            <input type="submit" value="Edit" />
        </form>
    )
}
export default Profile;