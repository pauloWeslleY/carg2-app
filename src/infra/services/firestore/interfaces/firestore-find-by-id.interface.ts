export interface IFirebaseFindById<R> {
  findById(id: string): Promise<R>
}
