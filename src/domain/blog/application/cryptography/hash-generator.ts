export type HashGenerator = {
  hash(plain: string): Promise<string>
}
