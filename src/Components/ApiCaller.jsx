import axios from "axios";



export const callPostApi = (url, data, successCallBack, failedCallBack) => {
    axios.post(url, data).then((result) => {
        if (successCallBack != null) {
            successCallBack(result);
        }
    }).catch((error) => {
        if (failedCallBack != null) {
            failedCallBack(error);
        }
    })
}


export const callPostApiWithoutPayload = (url, successCallBack, failedCallBack) => {
    axios.post(url).then((result) => {
        if (successCallBack != null) {
            if(result.status === 200){
                successCallBack(result.data);
            }
        }
    }).catch((error) => {
        if (failedCallBack != null) {
            failedCallBack(error);
        }
    })
}

