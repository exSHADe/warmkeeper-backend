export interface CRUD<T> {
  list: () => Promise<Array<T>>;
  create: (resource: any extends T ? T : any) => Promise<T>;
  putById: (id: string, resource: any extends T ? T : any) => Promise<T>;
  readById: (id: string) => Promise<T>;
  deleteById: (id: string) => Promise<T>;
  patchById: (id: string, resource: any extends T ? T : any) => Promise<T>;
}
