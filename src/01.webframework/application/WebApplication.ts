import { Application, ApplicationConfigurations, IApplicationConfigurations } from "../../00.framework/application/Application";
import { IRequestMetadata } from "../../00.framework/data/Metadata";
import { InstanceLoader } from "../../00.framework/loader/InstanceLoader";
import { IMain } from "../../00.framework/MainApplication";
import { IService } from "../../00.framework/service/Service";

export interface IWebApplicationConfigurations extends IApplicationConfigurations {

    registeService(serviceName: IService): void;
    getServices(): IService[];

    registeRenderer(renderer: Function): void;
}

export class WebApplicationConfigurations extends ApplicationConfigurations implements IWebApplicationConfigurations {
    private renderer: Function | null;

    constructor() {
        super();

        this.renderer = null;
    }

    registeCommandInstance(command: IMain): void {
        
    }

    registeService(serviceName: IService): void {
        this.services.push(serviceName);
    }

    getServices(): IService[] {
        return this.services;
    }

    registeRenderer(renderer: Function): void {
        this.renderer = renderer;
    }
}

export interface IWebApplication {

}

export abstract class WebApplication<T extends IWebApplicationConfigurations> extends Application<T> implements IWebApplication {
    constructor(configurations: T) {
        super(configurations);
    }
}