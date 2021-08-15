type KeyValue<T extends Record<PropertyKey, PropertyKey>> = {
  [P in keyof T]: { key: P, value: T[P] }
}[keyof T];

type Values<T extends Record<PropertyKey, PropertyKey>> = KeyValue<T>['value'];

type Invert<T extends Record<PropertyKey, PropertyKey>> = {
  [P in KeyValue<T>['value']]: Extract<KeyValue<T>, { value: P }>['key']
};
