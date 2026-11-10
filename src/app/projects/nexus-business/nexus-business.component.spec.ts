import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NexusBusinessPage } from './nexus-business.component';

describe('NexusBusinessPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NexusBusinessPage],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(NexusBusinessPage);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the Nexus Business dashboard', async () => {
    const fixture = TestBed.createComponent(NexusBusinessPage);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Visão geral');
    expect(compiled.querySelector('.brand-name')?.textContent).toContain('nexus');
    expect(compiled.querySelectorAll('tbody tr').length).toBe(5);
  });

  it('should filter clients by the search field', async () => {
    const fixture = TestBed.createComponent(NexusBusinessPage);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const search = compiled.querySelector('input[type="search"]') as HTMLInputElement;

    search.value = 'Aurora';
    search.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(compiled.querySelectorAll('tbody tr').length).toBe(1);
    expect(compiled.querySelector('tbody')?.textContent).toContain('Aurora Design Co.');
  });

  it('should add a client to the demo list', async () => {
    const fixture = TestBed.createComponent(NexusBusinessPage);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    (compiled.querySelector('.page-heading .button-primary') as HTMLButtonElement).click();
    fixture.detectChanges();

    const name = compiled.querySelector('input[name="name"]') as HTMLInputElement;
    const email = compiled.querySelector('input[name="email"]') as HTMLInputElement;
    name.value = 'Studio Exemplo';
    name.dispatchEvent(new Event('input'));
    email.value = 'studio@example.com';
    email.dispatchEvent(new Event('input'));
    compiled.querySelector('form')?.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    fixture.detectChanges();

    expect(compiled.querySelectorAll('tbody tr').length).toBe(6);
    expect(compiled.querySelector('tbody')?.textContent).toContain('Studio Exemplo');
  });

  it('should update the chart when its period changes', async () => {
    const fixture = TestBed.createComponent(NexusBusinessPage);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const period = compiled.querySelector('.revenue-panel select') as HTMLSelectElement;

    period.value = '7d';
    period.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(compiled.querySelector('.chart-svg')?.getAttribute('aria-label')).toContain('últimos 7 dias');
    expect(compiled.querySelector('.chart-x-labels')?.textContent).toContain('Seg');
  });
});
