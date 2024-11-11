export namespace IUploadFile {
  export type Params = {
    file: File
    fileURL: string
  }

  export type Model = string
}

export interface IUploadFile {
  uploadFile(params: IUploadFile.Params): Promise<IUploadFile.Model>
}
