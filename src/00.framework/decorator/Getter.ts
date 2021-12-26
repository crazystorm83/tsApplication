export function Getter<T>(target: any) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor): T {
        debugger;
        return target[propertyKey];
    }
}