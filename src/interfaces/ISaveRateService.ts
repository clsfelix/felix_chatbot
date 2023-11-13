export default interface ISaveRateService {
    baseUrl:string;
    handle(rate: IRate):Promise<boolean>
}

export interface IRate {
    registerId:string;
    rate: number;
}