
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CustomerComponent } from 'src/app/views/customer/customer.component';

import { Store } from '@ngrx/store';
import { AuthService } from '@services/auth.service';

describe('CustomerComponent', () => {
  let component: CustomerComponent;
  let fixture: ComponentFixture<CustomerComponent>;
  let storeMock: Partial<Store<any>>;
  let authServiceMock: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    storeMock = {
      pipe: jasmine.createSpy().and.returnValue({
        subscribe: jasmine.createSpy(),
      }),
    };

    authServiceMock = jasmine.createSpyObj('AuthService', ['logout']);

    TestBed.configureTestingModule({ //TODO TestBead - Configurar modulo de pruebas
      imports: [RouterTestingModule], //TODO - Importa el módulo de pruebas para enrutamiento
      providers: [
        { provide: Store, useValue: storeMock }, //TODO - Provee un mock para el Store
        { provide: AuthService, useValue: authServiceMock }, //TODO - Provee un mock para AuthService
      ],
    });

    fixture = TestBed.createComponent(CustomerComponent); //TODO - Crea una instancia del componente CustomerComponent
    component = fixture.componentInstance; //TODO - Obtiene la instancia del componente
  });


  it('should create the app', () => {
    expect(component).toBeTruthy(); //TODO - Verifica si el componente se ha creado correctamente
  });

  it('should call logout method from AuthService', () => {
    component.logout(); //TODO - Llama al método logout del componente
    expect(authServiceMock.logout).toHaveBeenCalled(); //TODO - Verifica si el método logout del AuthService ha sido llamado
  });
});