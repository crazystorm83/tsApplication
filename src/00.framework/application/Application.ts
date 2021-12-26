import { Api } from "../api/api";
import { IMetadata, IRequestMetadata } from "../data/Metadata";
import { EN_APPLICATION_REQUEST_TYPE } from "../enum/EN_APPLICATION_REQUEST_TYPE";
import { EN_REQUEST_METHOD } from "../enum/EN_REQUEST_METHOD";
import { IExecuteCommand, IMain, IReceiveCommand } from "../MainApplication";
import { IService } from "../service/Service";
import { Dispose, IDispose } from "./Dispose";
import { Key } from "./Key";

export interface IObject {
    [key: string]: any
}

export interface IApplicationConfigurations {
    addService(service: IService): void;
    getServices(): IService[];

    setMetadataInfo(requestMetadataInfo: IRequestMetadata): void;
    getMetadataInfo(): any;
}

export class ApplicationConfigurations implements IApplicationConfigurations {

    protected services: IService[];
    private metadataInfo: IRequestMetadata | null;
    protected viewRender: Function | null;

    constructor() {
        this.services = [];
        this.metadataInfo = null;
        this.viewRender = null;
    }

    addService(service: IService): void {
        this.services.push(service);
    }

    getServices(): IService[] {
        return this.services;
    }

    public setMetadataInfo<T extends IRequestMetadata>(requestMetadataInfo: T): void {
        this.metadataInfo = requestMetadataInfo;
    }
    public getMetadataInfo<T>(): T {
        return (this.metadataInfo || {}) as T;
    }
}

export interface IApplicationCommand {
    registeCommandInstance(command: IMain): void;
}

export interface IApplication<T> extends IApplicationCommand, IExecuteCommand, IReceiveCommand, IDispose {
    getConfigurations(): T;

    initialize(): Promise<{}>;
    loadMetadata(): Promise<{}>;
    loadDependencies(): Promise<{}>;
    loadServices(): Promise<{}>;
    loadCompleted(): Promise<void>;

    getServices(): IService[];
}

export abstract class Application<T extends IApplicationConfigurations> extends Key implements IApplication<T> {
    protected configurations: T;
    protected command: IMain | null;
    protected services: IService[];

    constructor(configurations: T) {
        super();

        this.configurations = configurations;
        this.command = null;
        this.services = [];
    }

    public dispose() {
        this.services.forEach(_service => {
            _service.dispose();
        })
    }

    //#################### IApplication ####################

    public getConfigurations(): T {
        return this.configurations;
    }
    
    public registeCommandInstance(command: IMain): void {
        this.command = command;
    }

    public async initialize(): Promise<{}> {
        console.log("application initialize");
        return new Promise((resolve, reject) => {
            return resolve({});
        })
    }

    public async loadMetadata(): Promise<{}> {
        console.log("application loadMetadata");
        return new Promise<{}>((resolve, reject) => {
            const metadataInfo = this.configurations.getMetadataInfo();
            if (metadataInfo.type == EN_APPLICATION_REQUEST_TYPE.URL) {
                resolve({ "a": "a"});
            } else if (metadataInfo.type == EN_APPLICATION_REQUEST_TYPE.FILE) {
                resolve({ "b": "b"});
            } else if (metadataInfo.type == EN_APPLICATION_REQUEST_TYPE.RAW_DATA) {
                resolve({ "c": "c"});
            } else {
                resolve({ "d": "d"});
            }
        }); 
    }

    public async loadDependencies(): Promise<{}> {
        console.log("application loadDependencies");
        return new Promise<{}>(async (resolve, reject) => {
            //const result = await Api.call("", EN_REQUEST_METHOD.GET);
            //resolve(result);
        })
    }

    public async loadServices(): Promise<{}> {
        console.log("application loadServices");
        return new Promise<{}>(async (resolve, reject) => {
            //const result = await Api.call("", EN_REQUEST_METHOD.GET);
            this.getConfigurations().getServices().forEach(_service => {
                this.services.push(_service);
            })

            resolve({"e":"e"});
        })
    }

    public async loadCompleted(): Promise<void> {
        console.log("application loadCompleted");
    }

    public getServices(): IService[] {
        return this.services;
    }
    
    //#################### IApplication ####################

    //#################### IExecuteCommand ####################

    public executeCommand<T, K>(command: string, args: T): void {
        this.command && this.command.pipe<string>("", "")
    }
    
    public async receiveCommand<T, K>(command: string, args: T): Promise<K> {
        return new Promise((resolve, reject) => {
            this.services.forEach(_service => {
                _service.receiveCommand<T, K>(command, args);
            })
            resolve({} as K);
        })
    }

    //#################### IExecuteCommand ####################
}