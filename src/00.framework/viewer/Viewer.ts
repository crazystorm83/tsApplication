import { IViewData } from "../data/ViewData";
import { IRenderer } from "../renderer/Renderer";


export interface IViewer extends IRenderer {
    
}

export abstract class Viewer implements IViewer {
    protected viewer: Function;

    constructor() {
        this.viewer = () => {};
    }

    //#################### IRenderer ####################
    
    public addViewer(callback: Function): void {
        this.viewer = callback;
    }

    public removeViewer(callback: Function): void {
        
    }

    public render<T extends IViewData>(args: T): void {
        console.log("called Viewer render");
        this.viewer(args);
    }

    //#################### IRenderer ####################
}