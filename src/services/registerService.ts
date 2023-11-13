import { api } from "../config/api"
import IRegister from "../interfaces/IRegister";
import IRegisterServie from "../interfaces/IRegisterService";
import { setSavedAnswers } from "../store/features/chatSlicer";
import store from "../store/store";


class RegisterService implements IRegisterServie{
    baseUrl:string
    constructor() {
        this.baseUrl = api.base_url;
    }

    add(register:IRegister):Promise<boolean> {
        return new Promise((resolve, reject) => {
            fetch(this.baseUrl + '/registers', {
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

const registerService = new RegisterService();

export default registerService;