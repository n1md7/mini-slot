export class Extension {
  static extract<T = unknown>(resource: string): T {
    const parts = resource.split('.');

    return <unknown>parts[parts.length - 1] as T;
  }
}