import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  showNotification(alert: any) {
    return Swal.fire({
      icon: alert.icon || 'success',
      title: alert.message || '',
      showConfirmButton: false,
      timer: 2300,
    });
  }
}
