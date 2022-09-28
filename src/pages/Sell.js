function sendToDatabase() {
    var title = document.getElementById("title");
    var isbn = document.getElementById("isbn");
    var author = document.getElementById("author");
    var edition = document.getElementById("edition");
    var price = document.getElementById("price");
    var description = document.getElementById("description");

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "");
    xhr.setRequestHeader("Request-type", "New Listing");

    xhr.send(String.format("{'title': '%s', 'isbn': '%s', 'author': '%s',\
    'edition': '%s', 'price': '%s', 'description': '%s',}", title, isbn,
    author, edition, price, description));
}

function Sell () {
    return (
        <form>
            <label>
                Title:
                <input id="title" type="text" required/>
            </label>
            <br/>
            <label>
                ISBN:
                <input id="isbn" type="text" required/>
            </label>
            <br/>
            <label>
                Author:
                <input id="author" type="text" required/>
            </label>
            <br/>
            <label>
                Edition:
                <input id="edition" type="text" required/>
            </label>
            <br/>
            <label>
                Price:
                <input id="price" type="text" required/>
            </label>
            <br/>
            <label>
                Description:
                <br/>
                <textarea id="description" maxlength="250"/>
            </label>
            <br/>
            <input type="submit" onClick="sendToDatabase()" value="Submit" />
        </form>
    )
}
  
export default Sell;