# StoreStandalone

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.10.

## Comands
 - Create project angular
   ng new proyecto1 --standalone --skip-tests --routing
 - Run project
   npm start
 - Crear componente standalone
    ng g c views/auth/signin --skip-tests --skip-import
    ng g c views/auth/signin --standalone   --> esto se usa si se creo un proyecto normal que no sea standalone

## Testing
 - ng test
 * Generar report coverage
  - ng test --no-watch --code-coverage (https://runebook.dev/es/docs/angular/guide/testing-code-coverage)

