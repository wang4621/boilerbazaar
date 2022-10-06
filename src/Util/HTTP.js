/**
* @return Promise
* @author Ben
* @param url: string
* @param body: object
* @param errorHandling: Function
* */
export const sendPostRequest = (url, body={}, errorHandling=()=>{window.location.reload()})=>{
    return new Promise((resolve, reject)=>{
        fetch(url, {
            method: "POST",
            body: JSON.stringify(body)
        }).then((resp)=>{
            return resp.json()
        }).then((data)=>{
            return data
        })
    })
}

/**
 * @author Ben
 * @return Promise
 * @param url: string
 * @param errorHandling: Function
 * */
export const sendGetRequest = (url, errorHandling=()=>{window.location.reload()})=>{
    return new Promise((resolve, reject)=>{
        fetch(url, {
            method: "GET"
        }).then((resp)=>{
            return resp.json()
        }).then((data)=>{
            return data
        })
    })
}