export type SmartOmit<T, K extends keyof T> = Omit<T, K>

export type Keyof<T> = keyof T extends any ? Extract<keyof T, string> : never

// given a dictionary, the key must match the value
// very useful to ensure the types are correct
type ValidTest<T> = {
  [K in keyof T]: K
}
export type AssertTest<T, U extends ValidTest<T>> = `-> ${Extract<
  keyof T,
  string
>}`

export type AssertEqual<T, U extends T> = U
