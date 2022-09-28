function Sell () {
    return (
        <form>
            <label>
                Title:
                <input type="text" required/>
            </label>
            <br/>
            <label>
                ISBN:
                <input type="text" required/>
            </label>
            <br/>
            <label>
                Author:
                <input type="text" required/>
            </label>
            <br/>
            <label>
                Edition:
                <input type="text" required/>
            </label>
            <br/>
            <label>
                Price:
                <input type="text" required/>
            </label>
            <br/>
            <label>
                Description:
                <br/>
                <textarea maxlength="250"/>
            </label>
            <br/>
            <input type="submit" value="Submit" />
        </form>
    )
}
  
export default Sell;