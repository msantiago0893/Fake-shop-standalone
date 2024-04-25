export class Storage {

  static getItem(key: string) {

    const result = localStorage.getItem(key);

    return result ? JSON.parse(result) : result;
  }

  static removeItem(key: string) {
    localStorage.removeItem(key);
  }

  static setItem(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
    return this;
  }

  static clear() {
    localStorage.clear();
  }
}