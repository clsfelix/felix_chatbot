import IRegister from "./IRegister";

export default interface IRegisterServie{
    baseUrl:string;
    add(register:IRegister):Promise<boolean>
}