import "./Sell.css"

function sendToServer() {
    var title = document.getElementById("title").value;
    var isbn = document.getElementById("isbn").value;
    var author = document.getElementById("author").value;
    var edition = document.getElementById("edition").value;
    var price = document.getElementById("price").value;
    var description = document.getElementById("description").value;
    var images = document.getElementById("images").files;
    var client = new XMLHttpRequest();
    client.open("POST", "http://localhost:8080", true);
    //client.setRequestHeader("Content-Type", "multipart/form-data");
    for (var i = 0; i < images.length; i++) {
        client.send(images[i]);
    }
    //console.log(FormData.get('image 1'));
    alert("Debug point");
    //client.setRequestHeader("Request_Type", 1);
    /*
    var client = new XMLHttpRequest();
    client.open("POST", "http://localhost:8080", true);
    
    var json = `{"title": "${title}", "isbn": "${isbn}", "author": "${author}", "edition": "${edition}", "price": "${price}", "description": "${description}"}`; 
    console.log(formData.getElementById("image 1"));
    //json.concat(" | " + );
    console.log(json);
    client.send(json);
    */
}

function dropHandler(ev) {
    ev.preventDefault();
    if (ev.dataTransfer.items) {
        [...ev.dataTransfer.items].forEach((item, i) => {
            if (item.kind === 'file') {
                const file = item.getAsFile();
                console.log(`... file[${i}].name = ${file.name}`);
            }
        });
    }
}

function dragOverHandler(ev) {
    ev.preventDefault();
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
            <label>
                Book images:
                <br/> 
                <input type="file" id="images" class="images" multiple></input>
                <label for="images">Upload image</label>
            </label>
            <br/><br/>
            <input type="submit" value="Submit" />
        </form>
    )
}

/*
            
*/
  
export default Sell;