import axios from "axios";

class ServiceRequest{
    getShopifyData(url){
        return axios.get(url).then((res)=>{
            console.log(res);
        }).catch((err)=>{
            console.log(err);
        });
    }
}

export default ServiceRequest;
