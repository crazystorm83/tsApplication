import { IServiceLifeCycleLoader, IServiceLifeCycleUnloader, IServiceLifeCycle, IService } from "./service/Service";
import { CanvasApplication, CanvasApplicationConfigurations, ICanvasApplicationConfigurations } from "../CanvasApplication/application/CanvasApplication";
import { Application, IApplication } from "./application/Application";
import { Dispose, IDispose } from "./application/Dispose";

export interface IResult {
    done: boolean;
    cancel: boolean;

    resolve(): void;
    reject(): void;
} 

export class Result implements IResult {
    done: boolean;
    cancel: boolean;

    constructor() {
        this.done = true;
        this.cancel = false;
    }

    public resolve(): void {

    }

    public reject(): void {

    }
}

export interface IExecuteCommandResult extends IResult {
}

export class CommandResult {
    constructor() {
    }
}

export interface IExecuteCommand {
    executeCommand<T, K>(command: string, args: T): void
}

export interface IReceiveCommand {
    receiveCommand<T, K>(command: string, args: T): Promise<K>
}

export interface IMainConfigurations {
}

export class MainConfigurations implements IMainConfigurations {
    constructor() {
    }
}

export interface IPipe<T> {
    pipe(command: string, args: T | T[]): this,
    execute(): void
}

export interface IMain {
    execute(): Promise<IResult>
    pipe<T>(command: string, args: T | T[]): IPipe<T>
} 

/**
 * 외부에 노출되는 interface 는 IExecuteCommand 만 노출되어야 executeCommand 를 통해서 내부 service 를 제어해야 한다.
 */
export class MainApplication<T> implements IMain, IDispose, IExecuteCommand {
    private workflowListener: [string, any][];

    constructor(private application: IApplication<T>, private configurations: IMainConfigurations) {
        this.workflowListener = [];

        this.initialize();
    }

    private async initialize() {
        this.application.registeCommandInstance(this);
        
        return new Promise(async (_resolve, _reject) => {
            const result = await this.application.initialize();

            _resolve(result);
        }).then(async result => {
            console.log("MainApplication then1 - result");
            console.log(result);
            return await this.application.loadMetadata();
        }).then(async result => {
            console.log("MainApplication then2 - result");
            console.log(result);
            return await this.application.loadServices();
        }).then(async result => {
            console.log("MainApplication then3 - result");
            console.log(result);

            await this.application.loadCompleted();
        }).catch((reason: any) => {
            console.log("MainApplication catch - result");
            throw new Error(reason);
        });
    }

    //#################### IMain ####################

    public pipe<T>(command: string, args: T | T[]): IPipe<T> {
        this.workflowListener.push([command, args]);
        return this;
    }

    public async execute(): Promise<IResult> {
        return new Promise((resolve, reject) =>  {
            this.workflowListener.forEach(async ([command, args]) => {
                const result = await this.executeCommand<typeof args, any>(command, args);
            });
        })
    }
    
    //#################### IMain ####################

    //#################### IDispose ####################
    
    public dispose() {
        this.application.dispose();
    }

    //#################### IDispose ####################

    //#################### IExecuteCommand ####################
    
    public executeCommand<T, K>(command: string, args: any): void {
        setTimeout(() => {
            this.application.receiveCommand<T, K>(command, args);
        }, 1000)
    }

    //#################### IExecuteCommand ####################
}