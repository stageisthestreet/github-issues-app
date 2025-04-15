import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { loadIssues } from './store/issues.actions';
import {selectError, selectIssues} from './store/issues.selectors';

describe('AppComponent with Jest', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let store: Store;

  const mockIssues = [
    { title: 'Issue 1', state: 'open', created_at: '2023-04-01' },
    { title: 'Issue 2', state: 'closed', created_at: '2023-04-02' },
    { title: 'Issue 3', state: 'open', created_at: '2023-04-03' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, FormsModule, NgxPaginationModule],
      providers: [
        provideMockStore({
          selectors: [
            { selector: 'issuesSelector', value: mockIssues },
            { selector: 'errorSelector', value: null }
          ]
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    fixture.detectChanges();
  });

  it('debe renderizar el título correctamente', () => {
    const h2 = fixture.nativeElement.querySelector('h2');
    expect(h2.textContent).toContain('Incidencias');
  });

  
  it('debe despachar la acción loadIssues al introducir la URL', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    component.repoUrl = 'l-lin/angular-datatables';
    component.fetchIssues();

    expect(dispatchSpy).toHaveBeenCalledWith(loadIssues({ url: 'l-lin/angular-datatables' }));
  });

  it('debe mostrar los issues cuando el selector devuelve datos', async () => {
    // Simula la carga de los issues en el store
    const storeOverride = TestBed.inject(Store) as any;
    storeOverride.overrideSelector(selectIssues, mockIssues);
    component.allIssues$ = store.select(selectIssues);
    fixture.detectChanges();

    // Espera a que Angular procese todas las tareas asincrónicas
    await fixture.whenStable();

    // Verifica que las filas sean mayores que 0
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBeGreaterThan(0);  // Asegura que haya filas

    // Imprime la cantidad de filas para depuración
    console.log('Número de filas en la tabla:', rows.length);
  });

  it('debe mostrar el mensaje de error cuando hay error en el store', () => {
    const storeOverride = TestBed.inject(Store) as any;
    storeOverride.overrideSelector(selectError, 'Error al cargar issues');
    component.error$ = store.select(selectError);
    fixture.detectChanges();

    const errorElement = fixture.nativeElement.querySelector('.alert-danger');
    expect(errorElement).toBeTruthy();
  });

  it('debe mostrar el mensaje de offline si navigator.onLine es false', () => {
    Object.defineProperty(navigator, 'onLine', { value: false, configurable: true });
    fixture.detectChanges();

    const offlineAlert = fixture.nativeElement.querySelector('.alert-warning');
    expect(offlineAlert.textContent).toContain('Estás sin conexión');
  });
});


