import { Storage } from "@memento/Storage";

export class ACL {

  static getDefaultRedirectPath(): any {

    const user: any = Storage.getItem('user');

    if(user) {

      const role = user && user.role;

      if ( ACL.isClient(role) ) {
        return 'customer';
      }

      if ( ACL.isManager(role) ) {
        return 'manager';
      }

      return '';
    }

    return '/auth/signin';
  }

  static isClient(role: string): Boolean {
    return role === 'customer'
  }

  static isManager(role: string): Boolean {
    return role === 'admin'
  }

}