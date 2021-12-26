import { IViewData } from "../../00.framework/data/ViewData";
import { IServiceConfigurations, Service } from "../../00.framework/service/Service";
import { Viewer, IViewer } from "../../00.framework/viewer/Viewer";

export interface IWebServiceConfigurations extends IServiceConfigurations, IViewer {

}

export class WebServiceConfigurations extends Viewer implements IWebServiceConfigurations {

    constructor() {
        super();
    }
}

export interface IWebService {

}

export abstract class WebService<T extends IWebServiceConfigurations> extends Service<T> implements IViewer {
    constructor(protected configurationOptions: T) {
        super(configurationOptions);
    }

    //#################### IRenderer ####################

    public addViewer(callback: Function): void {
        
    }

    public removeViewer(callback: Function): void {
        
    }

    public render<T extends IViewData>(args: T): void {
        console.log("called webService render");
        this.configurationOptions.render(args);
    }

    //#################### IRenderer ####################

    //#################### IExecuteCommand ####################

    public executeCommand<T, K>(command: string, args: T): void {
        this.command && this.command.pipe<string>("", "")
    }
    
    public async receiveCommand<T, K>(command: string, args: T): Promise<K> {
        console.log("called webService receiveCommand");
        return new Promise(async (resolve, reject) => {
            console.log(command);

            resolve({} as K)

            this.render(args);
        })
    }

    //#################### IExecuteCommand ####################
}