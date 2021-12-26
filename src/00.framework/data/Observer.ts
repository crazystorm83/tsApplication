export interface IObserver {
    subscribe(key: string, callback: Function): void
    unsbuscribe(key: string): void
    notify(key: string, value: any): void
}

export interface IObserverData {
    [key: string]: Function
}

export class Observer implements IObserver {
    private listener: IObserverData[];

    constructor() {
        this.listener = [];
    }

    public subscribe(key: string, callback: Function): void {
        this.listener.push({
            key: callback
        })
    }

    public onceSubscribe(key: string, callback: Function): void {
        if (!this.listener.find(_listener => {
            return _listener[key];
        })) {
            this.subscribe(key, callback);
        }
    }

    public unsbuscribe(key: string): void {
        const index = this.listener.findIndex(_listener => _listener[key]);
        if (index > -1) {
            this.listener.splice(index, 1);
        }
    }

    public notify(key: string, value: any): void {
        const listener = this.listener.find(_listener => _listener[key]);
        listener && listener[key](value);
    }
}