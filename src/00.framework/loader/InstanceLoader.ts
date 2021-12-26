export interface IInstanceLoader<T> {
    new (param: string): T
} 

export class InstanceLoader {
    static getInstance<T>(ctor: IInstanceLoader<T>, param: string): T {
        return new ctor(param) as T;
    }
}