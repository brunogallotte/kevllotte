export type Encrypter = {
  encrypt(payload: Record<string, unknown>): Promise<string>
}
