export interface HashComparer{
    compare(hashed: string, password: string): Promise<boolean>
}
