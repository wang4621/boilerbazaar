function sendToServer() {
    var title = document.getElementById("title").value;
    var isbn = document.getElementById("isbn").value;
    var author = document.getElementById("author").value;
    var edition = document.getElementById("edition").value;
    var price = document.getElementById("price").value;
    var description = document.getElementById("description").value;
    
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "localhost:8080");
    xhr.setRequestHeader("Request-type", "New Listing");
    console.log(xhr.readyState);
    xhr.send(String.format("{'title': '%s', 'isbn': '%s', 'author': '%s',\
    'edition': '%s', 'price': '%s', 'description': '%s',}", title, isbn,
    author, edition, price, description));
    xhr.close();
    return false;
}

function Sell () {
    return (
        <form onSubmit={sendToServer}>
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
            <input type="submit" value="Submit" />
        </form>
    )
}
  
export default Sell;