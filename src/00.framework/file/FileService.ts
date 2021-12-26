import { IServiceConfigurations, Service, ServiceConfigurations } from "../service/Service";

export interface IFileServiceConfigurations extends IServiceConfigurations {

}

export class FileServiceConfigurations implements IFileServiceConfigurations {
    constructor() {
    }
}

export interface IFileService {
    
}

export class FileService<T extends IFileServiceConfigurations> extends Service<T> implements IFileService {

}