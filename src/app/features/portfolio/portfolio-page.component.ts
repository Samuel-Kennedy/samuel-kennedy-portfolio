import { Component, DestroyRef, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

interface Experience {
  company: string;
  period: string;
  area: string;
  description: string;
  technologies: string[];
}

interface SkillGroup {
  title: string;
  skills: string[];
}

@Component({
  imports: [RouterLink],
  selector: 'app-portfolio-page',
  templateUrl: './portfolio-page.component.html',
})
export class PortfolioPage {
  protected readonly experiences: Experience[] = [
    {
      company: 'Objective',
      period: 'Dez. 2025 — atual',
      area: 'Tecnologia · segmento financeiro',
      description:
        'Atuação no desenvolvimento e evolução de aplicações corporativas, contribuindo com arquitetura, experiência do usuário, integrações e qualidade de software.',
      technologies: [
        'Angular',
        'React',
        'TypeScript',
        'RxJS',
        'Node.js',
        'CI/CD',
        'Jenkins',
        'Argo',
        'Figma',
      ],
    },
    {
      company: 'Viceri Seidor',
      period: 'Jul. 2025 — Dez. 2025',
      area: 'Tecnologia · segmento de seguros',
      description:
        'Desenvolvimento de aplicações web, componentes e integrações, com foco em responsividade, evolução de bibliotecas e qualidade de entrega.',
      technologies: [
        'Angular',
        'TypeScript',
        'RxJS',
        'APIs REST',
        'Angular Material',
        'Bootstrap',
        'Azure',
        'Jenkins',
      ],
    },
    {
      company: 'Spread',
      period: 'Nov. 2024 — Jun. 2025',
      area: 'Tecnologia · segmento de energia',
      description:
        'Atuação em aplicações e integrações para o segmento de energia, trabalhando com interfaces web, serviços e metodologias ágeis.',
      technologies: [
        'TypeScript',
        'JavaScript',
        'Node.js',
        'Oracle Field Service',
        'RxJS',
        'APIs REST',
        'SQL',
      ],
    },
    {
      company: 'Tata Consultancy Services',
      period: 'Jul. 2019 — Nov. 2024',
      area: 'Tecnologia · segmento bancário',
      description:
        'Experiência em projetos dos segmentos bancário e financeiro, participando do desenvolvimento de aplicações, interfaces acessíveis e soluções web em equipes multidisciplinares.',
      technologies: [
        'Angular 8',
        'TypeScript',
        'JavaScript',
        'Angular Material',
        'Java Web',
        'MySQL',
        'SQL Server',
        'Jest',
        'Karma',
      ],
    },
  ];

  protected readonly skillGroups: SkillGroup[] = [
    {
      title: 'Front-end',
      skills: [
        'Angular',
        'TypeScript',
        'JavaScript',
        'React',
        'RxJS',
        'HTML5',
        'CSS3',
        'SCSS',
        'Angular Material',
        'Bootstrap',
      ],
    },
    {
      title: 'Back-end & integrações',
      skills: ['Node.js', 'APIs REST', 'JSON Server', 'MySQL', 'SQL Server', 'Java Web'],
    },
    {
      title: 'Qualidade & testes',
      skills: ['Jest', 'Karma', 'Testes unitários', 'Acessibilidade', 'Sonar', 'Fortify'],
    },
    {
      title: 'DevOps & ferramentas',
      skills: [
        'Git',
        'GitHub',
        'Bitbucket',
        'Jenkins',
        'Azure',
        'Argo',
        'CI/CD',
        'Postman',
        'Visual Studio Code',
      ],
    },
    {
      title: 'Métodos & produto',
      skills: [
        'Scrum',
        'Metodologias ágeis',
        'Jira',
        'Confluence',
        'Figma',
        'UX/UI',
        'Arquitetura de aplicações',
      ],
    },
  ];

  protected readonly services = [
    'Aplicações web com Angular',
    'Interfaces responsivas e acessíveis',
    'Dashboards e sistemas administrativos',
    'Integrações com APIs REST',
    'Manutenção e evolução de sistemas',
    'Correção de bugs e modernização',
  ];

  protected readonly certifications = [
    'Scrum Foundations Professional — CertiProf',
    'Scrum Master Advanced',
    'Agile Methodology Advanced',
    'Fundamentos da Gestão de TI — FGV',
    'Gestão de Projetos',
    'Gestão de Processos',
    'JavaScript',
  ];

  constructor() {
    const destroyRef = inject(DestroyRef);
    inject(ActivatedRoute)
      .data.pipe(takeUntilDestroyed(destroyRef))
      .subscribe((data) => {
        const section = data['sectionId'];
        if (typeof section === 'string' && section !== 'top') {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
            });
          });
        }
      });
  }
}
