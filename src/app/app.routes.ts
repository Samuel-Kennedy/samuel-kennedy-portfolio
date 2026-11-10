import type { Routes } from '@angular/router';

const loadPortfolio = () =>
  import('./features/portfolio/portfolio-page.component').then(
    (module) => module.PortfolioPage,
  );

export const routes: Routes = [
  {
    path: '',
    loadComponent: loadPortfolio,
    title: 'Samuel Kennedy — Senior Software Engineer',
    data: { sectionId: 'top' },
  },
  {
    path: 'sobre',
    loadComponent: loadPortfolio,
    title: 'Sobre — Samuel Kennedy',
    data: { sectionId: 'sobre' },
  },
  {
    path: 'experiencia',
    loadComponent: loadPortfolio,
    title: 'Experiência — Samuel Kennedy',
    data: { sectionId: 'experiencia' },
  },
  {
    path: 'projetos/nexus-business',
    loadComponent: () =>
      import('./projects/nexus-business/nexus-business.component').then(
        (module) => module.NexusBusinessPage,
      ),
    title: 'Nexus Business — Samuel Kennedy',
  },
  {
    path: 'projetos',
    loadComponent: loadPortfolio,
    title: 'Projetos — Samuel Kennedy',
    data: { sectionId: 'projetos' },
  },
  {
    path: 'contato',
    loadComponent: loadPortfolio,
    title: 'Contato — Samuel Kennedy',
    data: { sectionId: 'contato' },
  },
  {
    path: '**',
    redirectTo: '',
  },
];
