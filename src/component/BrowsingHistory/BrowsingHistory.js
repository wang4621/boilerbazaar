function BrowsingHistory (){
    const data = [
        {
            img: "https://m.media-amazon.com/images/I/41jdHU5RZsL._SX351_BO1,204,203,200_.jpg",
            url: "*",
            name: "book1",
            lastOpen: new Date()
        },
        {
            img: "https://m.media-amazon.com/images/I/41jdHU5RZsL._SX351_BO1,204,203,200_.jpg",
            url: "*",
            name: "book2",
            lastOpen: new Date()
        },
        {
            img: "https://m.media-amazon.com/images/I/41jdHU5RZsL._SX351_BO1,204,203,200_.jpg",
            url: "*",
            name: "book3",
            lastOpen: new Date()
        }
    ]
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
                                    <img src={each.img} style={{
                                        width: "60px"
                                    }}></img>
                                    <br/>
                                    <div href={each.url}>{each.name}</div>
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