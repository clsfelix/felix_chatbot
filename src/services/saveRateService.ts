import { api } from "../config/api"
import ISaveRateService, { IRate } from "../interfaces/ISaveRateService";
import { setSavedAnswers } from "../store/features/chatSlicer";
import store from "../store/store";


class SaveRateService implements ISaveRateService{
    baseUrl:string
    constructor() {
        this.baseUrl = api.base_url;
    }

    handle(register:IRate):Promise<boolean> {
        return new Promise((resolve, reject) => {
            fetch(this.baseUrl + '/rate', {
                method:'POST',
                body:JSON.stringify(register),
                headers: {
                    "Content-Type": "application/json",
                  },
            }).then(async(response) => {
                if(response.ok) {
                    const json = await response.json();
                    store.dispatch(setSavedAnswers(json))
                    resolve(true);
                }
            }).catch((error) => {
                console.error(error);
                reject(false);
            })
        })
    }

}

const saveRateService = new SaveRateService();

export default saveRateService;