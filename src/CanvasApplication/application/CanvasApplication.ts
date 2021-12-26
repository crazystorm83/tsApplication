import { IMain } from "../../00.framework/MainApplication";
import { IWebApplicationConfigurations, WebApplication, WebApplicationConfigurations } from "../../01.webframework/application/WebApplication";

export interface ICanvasApplicationConfigurations extends IWebApplicationConfigurations {

}

export class CanvasApplicationConfigurations extends WebApplicationConfigurations implements ICanvasApplicationConfigurations {
    registeCommandInstance(command: IMain): void {
        
    }
}

export interface ICanvasApplication {
    
}

export class CanvasApplication<T extends ICanvasApplicationConfigurations> extends WebApplication<T> implements ICanvasApplication {
    constructor(configurations: T) {
        super(configurations);
    }
}