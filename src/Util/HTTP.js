/**
* @return Promise
* @author Ben
* @param url: string
* @param body: object
* */
export const sendPostRequest = (url, body={})=>{
    return new Promise((resolve, reject)=>{
        fetch(url, {
            method: "POST",
            body: JSON.stringify(body)
        }).then((resp)=>{
            return resp.json()
        }).then((data)=>{
            resolve(data)
        }).catch(()=>{
            reject()
        })
    })
}

/**
 * @author Ben
 * @return Promise
 * @param url: string
 * */
export const sendGetRequest = (url)=>{
    return new Promise((resolve, reject)=>{
        fetch(url, {
            method: "GET"
        }).then((resp)=>{
            return resp.json()
        }).then((data)=>{
            resolve(data)
        }).catch(()=>{
            reject()
        })
    })
}