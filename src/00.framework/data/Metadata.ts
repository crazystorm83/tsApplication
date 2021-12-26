import { EN_APPLICATION_REQUEST_TYPE } from "../enum/EN_APPLICATION_REQUEST_TYPE";

export interface IMetadata {
    
}

export interface IRequestMetadata {
    type: EN_APPLICATION_REQUEST_TYPE
}

export abstract class Metadata implements IMetadata {
    
}