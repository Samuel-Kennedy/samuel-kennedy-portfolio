import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PortfolioPage } from './portfolio-page.component';

describe('PortfolioPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioPage],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should present Samuel as a Senior Software Engineer', async () => {
    const fixture = TestBed.createComponent(PortfolioPage);
    await fixture.whenStable();
    const page = fixture.nativeElement as HTMLElement;

    expect(page.querySelector('h1')?.textContent).toContain('Software que resolve.');
    expect(page.textContent).toContain('Senior Software Engineer');
    expect(page.querySelectorAll('.timeline-entry').length).toBe(4);
  });

  it('should feature Nexus Business as an independent demo project', async () => {
    const fixture = TestBed.createComponent(PortfolioPage);
    await fixture.whenStable();
    const page = fixture.nativeElement as HTMLElement;
    const projectLink = page.querySelector<HTMLAnchorElement>('.project-link');

    expect(page.querySelector('.project-info h3')?.textContent).toContain('Nexus Business');
    expect(projectLink?.getAttribute('href')).toBe('/projetos/nexus-business');
    expect(page.textContent).toContain('dados desta demonstração são fictícios');
    expect(page.textContent).toContain('acordos de confidencialidade');
  });

  it('should show Samuel’s portrait and link directly to WhatsApp', async () => {
    const fixture = TestBed.createComponent(PortfolioPage);
    await fixture.whenStable();
    const page = fixture.nativeElement as HTMLElement;
    const portrait = page.querySelector<HTMLImageElement>('.hero-portrait img');
    const whatsapp = page.querySelector<HTMLAnchorElement>('.whatsapp-button');

    expect(portrait?.getAttribute('src')).toBe('/images/samuel-kennedy.jfif');
    expect(whatsapp?.getAttribute('href')).toContain('https://wa.me/5543999074692');
    expect(whatsapp?.textContent).toContain('(43) 99907-4692');
  });
});
