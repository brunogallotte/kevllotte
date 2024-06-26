export type HashComparer = {
  compare(plain: string, hash: string): Promise<boolean>
}
