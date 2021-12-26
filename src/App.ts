import { IExecuteCommand, MainApplication, MainConfigurations } from "./00.framework/MainApplication";
import { CanvasApplication, CanvasApplicationConfigurations, ICanvasApplicationConfigurations } from "./CanvasApplication/application/CanvasApplication";
import { CanvasService, CanvasServiceConfigurations, ICanvasServiceConfigurations } from "./CanvasApplication/service/CanvasService";

const applicationConfigurations = new MainConfigurations();

const canvasAppConfig: ICanvasApplicationConfigurations = new CanvasApplicationConfigurations();

const canvasServiceConf: ICanvasServiceConfigurations = new CanvasServiceConfigurations();
canvasServiceConf.addViewer((viewData: any) => {
    console.log("canvas service viewer render");
});
const canvasService = new CanvasService(canvasServiceConf)

canvasAppConfig.addService(canvasService);

const main: IExecuteCommand = new MainApplication(new CanvasApplication(canvasAppConfig), applicationConfigurations);

main.executeCommand<Object, any>("Hello Command 1", {});

// setTimeout(() => {
//     console.log('called setTimeout');
//     main.executeCommand<Object, any>("Hello Command 1", {});
// }, 5000); 