function sendToServer() {
    var title = document.getElementById("title").value;
    var isbn = document.getElementById("isbn").value;
    var author = document.getElementById("author").value;
    var edition = document.getElementById("edition").value;
    var price = document.getElementById("price").value;
    var description = document.getElementById("description").value;
    var client = new XMLHttpRequest();
    client.open("POST", "http://localhost:8080", true);
    //client.setRequestHeader("Request_Type", 1);
    client.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
    var json = `{"title": "${title}", "isbn": "${isbn}", "author": "${author}", "edition": "${edition}", "price": "${price}", "description": "${description}"}`; 
    console.log(json);
    client.send(json);
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