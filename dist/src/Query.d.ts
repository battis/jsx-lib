export declare abstract class GetRequestParameters {
    [key: string]: string;
}
export default class Query {
    static queryString(parameters: GetRequestParameters | object): string;
    /**
     * @see https://stackoverflow.com/a/8486188
     * @param url
     */
    static parseGetParameters(url?: any): GetRequestParameters;
    /**
     * @see {@link https://stackoverflow.com/a/40552372|Stack Overflow}
     * @param obj
     */
    static getFormData(obj: object): FormData;
}
