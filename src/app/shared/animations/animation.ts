import { trigger, transition, style, animate } from '@angular/animations';

export const slideInOutAnimation = trigger('slideInOut', [
  transition(':enter', [
    style({ transform: 'translateY(-100%)', opacity: 0 }),
    animate('300ms ease-in', style({ transform: 'translateY(0%)', opacity: 1 })),
  ]),
  transition(':leave', [
    animate('300ms ease-out', style({ transform: 'translateY(-100%)', opacity: 0 })),
  ]),
]);

export const fadeAnimation = trigger('fade', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('300ms ease-in', style({ opacity: 1 })),
  ]),
  transition(':leave', [
    animate('300ms ease-out', style({ opacity: 0 })),
  ]),
]);

export const scaleAnimation = trigger('scale', [
  transition(':enter', [
    style({ transform: 'scale(0.5)', opacity: 0 }),
    animate('300ms ease-in', style({ transform: 'scale(1)', opacity: 1 })),
  ]),
  transition(':leave', [
    animate('300ms ease-out', style({ transform: 'scale(0.5)', opacity: 0 })),
  ]),
]);