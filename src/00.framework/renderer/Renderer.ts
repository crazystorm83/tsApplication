import { IViewData } from "../data/ViewData";

export interface IRenderer {
    addViewer(callback: Function): void;
    removeViewer(callback: Function): void;
    render<T extends IViewData>(args: T): void;
}

export abstract class Renderer implements IRenderer {
    public addViewer(callback: Function): void {
        
    }

    public removeViewer(callback: Function): void {
        
    }

    public render<T extends IViewData>(args: T): void {

    }
}