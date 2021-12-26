import { IServiceConfigurations, Service } from "../service/Service";
import { FileService } from "./FileService";

export interface IImageServiceConfigurations extends IServiceConfigurations {

}

export class ImageServiceConfigurations implements IImageServiceConfigurations {
    constructor() {
    }
}

export interface IImageService {
    
}

export class ImageService<T extends ImageServiceConfigurations> extends FileService<T> implements IImageService {

}