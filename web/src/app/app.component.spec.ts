import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxPaginationModule } from 'ngx-pagination';

describe('AppComponent', () => {
  let fixture: any;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent, 
        RouterModule.forRoot([]),
        HttpClientTestingModule,  // Mock HTTP requests
        NgxPaginationModule       // Para usar paginación en los tests
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should render title', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Introduce la URL del repositorio de GitHub:');
  });

  it('should display 10 simulated issues in the table', () => {
    component.allIssues = [
      { title: 'Issue 1', state: 'open', created_at: '2023-04-01' },
      { title: 'Issue 2', state: 'closed', created_at: '2023-04-02' },
      { title: 'Issue 3', state: 'open', created_at: '2023-04-03' },
      { title: 'Issue 4', state: 'open', created_at: '2023-04-04' },
      { title: 'Issue 5', state: 'closed', created_at: '2023-04-05' },
      { title: 'Issue 6', state: 'open', created_at: '2023-04-06' },
      { title: 'Issue 7', state: 'closed', created_at: '2023-04-07' },
      { title: 'Issue 8', state: 'open', created_at: '2023-04-08' },
      { title: 'Issue 9', state: 'open', created_at: '2023-04-09' },
      { title: 'Issue 10', state: 'closed', created_at: '2023-04-10' }
    ];

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const rows = compiled.querySelectorAll('tbody tr');
    expect(rows.length).toBe(5);
    expect(rows[0].textContent).toContain('Issue 1');
    expect(rows[1].textContent).toContain('Issue 2');
    expect(rows[2].textContent).toContain('Issue 3');
    expect(rows[3].textContent).toContain('Issue 4');
    expect(rows[4].textContent).toContain('Issue 5');
  });

  it('should paginate through the table', () => {
    component.allIssues = [
      { title: 'Issue 1', state: 'open', created_at: '2023-04-01' },
      { title: 'Issue 2', state: 'closed', created_at: '2023-04-02' },
      { title: 'Issue 3', state: 'open', created_at: '2023-04-03' },
      { title: 'Issue 4', state: 'open', created_at: '2023-04-04' },
      { title: 'Issue 5', state: 'closed', created_at: '2023-04-05' },
      { title: 'Issue 6', state: 'open', created_at: '2023-04-06' },
      { title: 'Issue 7', state: 'closed', created_at: '2023-04-07' },
      { title: 'Issue 8', state: 'open', created_at: '2023-04-08' },
      { title: 'Issue 9', state: 'open', created_at: '2023-04-09' },
      { title: 'Issue 10', state: 'closed', created_at: '2023-04-10' }
    ];
  
    component.page = 1;
    fixture.detectChanges();
  
    let rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(5);
    expect(rows[0].textContent).toContain('Issue 1');
    expect(rows[4].textContent).toContain('Issue 5');
  
    component.page = 2;
    fixture.detectChanges();
  
    rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(5);
    expect(rows[0].textContent).toContain('Issue 6');
    expect(rows[4].textContent).toContain('Issue 10');
  });

  it('should display offline alert when navigator is offline', () => {
    // Simulamos que el usuario está offline
    Object.defineProperty(navigator, 'onLine', { value: false, configurable: true });
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const offlineAlert = compiled.querySelector('.alert.alert-warning');
  
    expect(offlineAlert).toBeTruthy();
    expect(offlineAlert?.textContent).toContain('Estás sin conexión. Mostrando datos en caché si están disponibles.');
  });
});
