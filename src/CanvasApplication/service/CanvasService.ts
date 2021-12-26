import { IViewData } from "../../00.framework/data/ViewData";
import { IWebServiceConfigurations, WebServiceConfigurations, WebService } from "../../01.webframework/service/WebService";

export interface ICanvasServiceConfigurations extends IWebServiceConfigurations {

}

export class CanvasServiceConfigurations extends WebServiceConfigurations implements ICanvasServiceConfigurations {
}

export interface ICanvasService {

}

export class CanvasService<T extends ICanvasServiceConfigurations> extends WebService<T> implements ICanvasService {
    constructor(configurations: T) {
        super(configurations);
    }
}