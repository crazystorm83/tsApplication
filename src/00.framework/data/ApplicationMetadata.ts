import { IMetadata, Metadata } from "./Metadata";

export interface IApplicationMetadata extends IMetadata {

}

export abstract class ApplicationMetadata extends Metadata implements IApplicationMetadata {

}