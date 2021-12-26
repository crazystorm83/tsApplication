import { IMetadata, Metadata } from "./Metadata";

export interface IServiceMetadata extends IMetadata {

}

export abstract class ServiceMetadata extends Metadata implements IServiceMetadata {

}