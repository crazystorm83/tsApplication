import { Dispose, IDispose } from "../application/Dispose";
import { Key } from "../application/Key";
import { IPipe, IMain, IExecuteCommand, IReceiveCommand } from "../MainApplication";



export interface IServiceLifeCycleLoader {
    registerService(serviceName: string, service: IService): void;
}

export interface IServiceLifeCycleUnloader {
    unregisterService(serviceName: string): void;
}

export interface IServiceLifeCycleDestory {
    beforeDestroy(): void;
}

export interface IServiceLifeCycleService {
    hasService(serviceName: string): boolean;
}

export interface IServiceLifeCycle extends IServiceLifeCycleLoader, IServiceLifeCycleUnloader {

}




export interface IServiceConfigurations {
}

export class ServiceConfigurations implements IServiceConfigurations {
    constructor() {
    }
}

export interface IService extends IExecuteCommand, IReceiveCommand, IDispose {
    uuid: string

    loadMetadata(): Promise<void>
    loadCompleted(): Promise<void>;
}

export abstract class Service<T extends IServiceConfigurations> extends Key implements IService {
    protected command: IMain | null;

    constructor(protected configurationOptions: T) {
        super();

        this.command = null;
    }

    public dispose(): void {

    }

    public async loadMetadata(): Promise<void> {
        return new Promise((resolve, reject) => {
            
        })
    }

    public async loadCompleted(): Promise<void> {
        
    }

    public initCommand(command: IMain, ): void {
        this.command = command;
    }

    public executeCommand<T, K>(command: string, args: T): void {
        this.command && this.command.pipe<string>("", "")
    }
    
    public async receiveCommand<T, K>(command: string, args: T): Promise<K> {
        console.log("called service receiveCommand");
        return new Promise(async (resolve, reject) => {
            console.log(command);

            resolve({} as K)
        })
    }
}