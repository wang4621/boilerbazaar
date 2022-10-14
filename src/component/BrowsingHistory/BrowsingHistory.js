import {useState} from "react";
import {sendGetRequest} from "../../Util/HTTP";

function BrowsingHistory (){
    const [data, setData] = useState([
        {
            name:"Designing Data-Intensive Applications",
            image: "https://images-na.ssl-images-amazon.com/images/I/91JAIKQUkYL._AC_UL232_SR232,232_.jpg",
            url: "*"
        },
        {
            name:"Cloud computing and AWS",
            image: "https://images-na.ssl-images-amazon.com/images/I/61yTwax120L._AC_UL320_SR320,320_.jpg",
            url: "*"
        },
        {
            name:"Introduction to cloud computing",
            image: "https://images-na.ssl-images-amazon.com/images/I/71rbWhYKI7L._AC_UL320_SR320,320_.jpg",
            url: "*"
        },
        {
            name:"Golang for DevOps",
            image: "https://m.media-amazon.com/images/I/71GEXj+7hVL._AC_UL480_FMwebp_QL65_.jpg",
            url: "*"
        },
    ])
    const email = "doan23@purdue.edu"

    if (data === null) {
        sendGetRequest(`https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/search_history?email=${email}`).then((rep)=>{
            setData(rep.body)
        })
        return <div>Loading...</div>
    }
    return (
        <div style={{
            width: "1000px",
            marginLeft: "auto",
            marginRight : "auto"
        }}>
            <div style={{
                fontWeight: "bold"
            }}>Recently opened</div>
            <div>
                <hr/>
                {data.map((each, index)=>{
                    return <div key={index}>
                        <div style={{margin: "10px"}}>
                            <div style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-around"
                            }}>
                                <div style={{
                                        display: "flex",
                                        flexDirection: "column"
                                }}>
                                    <img src={each.image} style={{
                                        width: "120px"
                                    }}></img>
                                    <br/>
                                    <a href={each.url}>{each.name}</a>
                                </div>

                                <div>Your opened just now</div>
                            </div>
                            <hr/>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}

export default BrowsingHistory