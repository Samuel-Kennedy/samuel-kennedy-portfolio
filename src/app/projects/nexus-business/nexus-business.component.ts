import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

type Period = '7d' | '30d' | '90d';
type ClientStatus = 'Ativo' | 'Pendente';
type ClientFilter = 'Todos' | ClientStatus;

interface Client {
  name: string;
  email: string;
  category: string;
  projects: number;
  total: string;
  status: ClientStatus;
  initials: string;
  color: string;
}

const initialClients: Client[] = [
  { name: 'Aurora Design Co.', email: 'contato@auroradesign.com', category: 'Design & Branding', projects: 3, total: '8.400,00', status: 'Ativo', initials: 'AD', color: 'avatar-lilac' },
  { name: 'Verde Vivo Orgânicos', email: 'oi@verdevivo.com.br', category: 'Varejo', projects: 2, total: '5.200,00', status: 'Ativo', initials: 'VV', color: 'avatar-green' },
  { name: 'Casa Amora', email: 'hello@casaamora.com.br', category: 'Arquitetura', projects: 1, total: '3.750,00', status: 'Pendente', initials: 'CA', color: 'avatar-peach' },
  { name: 'Mobi Studio', email: 'projetos@mobistudio.com', category: 'Tecnologia', projects: 4, total: '12.800,00', status: 'Ativo', initials: 'MS', color: 'avatar-blue' },
  { name: 'Café do Centro', email: 'gestao@cafedocentro.com.br', category: 'Alimentação', projects: 1, total: '2.100,00', status: 'Ativo', initials: 'CC', color: 'avatar-pink' },
];

const chartData: Record<Period, { labels: string[]; income: number[]; expenses: number[] }> = {
  '7d': {
    labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
    income: [70, 50, 62, 36, 44, 20, 32],
    expenses: [116, 105, 121, 92, 111, 84, 99],
  },
  '30d': {
    labels: ['01 Nov', '05 Nov', '10 Nov', '15 Nov', '20 Nov', '25 Nov', '30 Nov'],
    income: [128, 101, 111, 72, 92, 54, 68],
    expenses: [157, 145, 161, 130, 148, 112, 127],
  },
  '90d': {
    labels: ['Set', '15 Set', 'Out', '15 Out', 'Nov', '15 Nov', 'Hoje'],
    income: [112, 82, 98, 57, 78, 42, 59],
    expenses: [165, 151, 169, 137, 153, 120, 139],
  },
};

@Component({
  imports: [RouterLink],
  selector: 'app-nexus-business',
  templateUrl: './nexus-business.component.html',
})
export class NexusBusinessPage {
  protected readonly clients = signal<Client[]>(initialClients);
  protected readonly selectedPeriod = signal<Period>('30d');
  protected readonly statusFilter = signal<ClientFilter>('Todos');
  protected readonly searchQuery = signal('');
  protected readonly activeSection = signal('overview');
  protected readonly isClientFormOpen = signal(false);
  protected readonly newClientName = signal('');
  protected readonly newClientEmail = signal('');
  protected readonly formError = signal('');
  protected readonly toastMessage = signal('');
  private toastTimer: ReturnType<typeof setTimeout> | undefined;

  protected readonly filteredClients = computed(() => {
    const query = this.searchQuery().trim().toLocaleLowerCase('pt-BR');
    const status = this.statusFilter();

    return this.clients().filter((client) => {
      const matchesStatus = status === 'Todos' || client.status === status;
      const matchesQuery =
        !query ||
        client.name.toLocaleLowerCase('pt-BR').includes(query) ||
        client.email.toLocaleLowerCase('pt-BR').includes(query) ||
        client.category.toLocaleLowerCase('pt-BR').includes(query);

      return matchesStatus && matchesQuery;
    });
  });

  protected readonly activeClientCount = computed(
    () => this.clients().filter((client) => client.status === 'Ativo').length,
  );
  protected readonly pageTitle = computed(() => {
    const titles: Record<string, string> = {
      overview: 'Visão geral',
      clients: 'Clientes',
      projects: 'Projetos',
      reports: 'Relatórios',
    };
    return titles[this.activeSection()] ?? 'Visão geral';
  });
  protected readonly periodLabel = computed(() => {
    const labels: Record<Period, string> = {
      '7d': 'últimos 7 dias',
      '30d': 'últimos 30 dias',
      '90d': 'últimos 90 dias',
    };
    return labels[this.selectedPeriod()];
  });
  protected readonly chartLabels = computed(() => chartData[this.selectedPeriod()].labels);
  protected readonly incomePoints = computed(() => this.toChartPoints(chartData[this.selectedPeriod()].income));
  protected readonly expensePoints = computed(() => this.toChartPoints(chartData[this.selectedPeriod()].expenses));
  protected readonly incomePointList = computed(() =>
    chartData[this.selectedPeriod()].income.map((value, index, values) => ({
      x: (index * 700) / (values.length - 1),
      y: value,
    })),
  );
  protected readonly todayLabel = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date());

  protected setActiveSection(section: string): void {
    this.activeSection.set(section);
  }

  protected updateSearch(event: Event): void {
    this.searchQuery.set((event.target as HTMLInputElement).value);
  }

  protected changePeriod(event: Event): void {
    const period = (event.target as HTMLSelectElement).value;
    if (period === '7d' || period === '30d' || period === '90d') {
      this.selectedPeriod.set(period);
    }
  }

  protected changeStatusFilter(event: Event): void {
    const status = (event.target as HTMLSelectElement).value;
    if (status === 'Todos' || status === 'Ativo' || status === 'Pendente') {
      this.statusFilter.set(status);
    }
  }

  protected clearClientFilters(): void {
    this.searchQuery.set('');
    this.statusFilter.set('Todos');
  }

  protected openClientForm(): void {
    this.formError.set('');
    this.isClientFormOpen.set(true);
  }

  protected closeClientForm(): void {
    this.isClientFormOpen.set(false);
    this.formError.set('');
  }

  protected updateNewClientName(event: Event): void {
    this.newClientName.set((event.target as HTMLInputElement).value);
    this.formError.set('');
  }

  protected updateNewClientEmail(event: Event): void {
    this.newClientEmail.set((event.target as HTMLInputElement).value);
    this.formError.set('');
  }

  protected addClient(event: Event): void {
    event.preventDefault();
    const name = this.newClientName().trim();
    const email = this.newClientEmail().trim();

    if (!name || !email) {
      this.formError.set('Informe o nome e o e-mail do cliente.');
      return;
    }

    if (this.clients().some((client) => client.email.toLocaleLowerCase('pt-BR') === email.toLocaleLowerCase('pt-BR'))) {
      this.formError.set('Já existe um cliente cadastrado com este e-mail.');
      return;
    }

    const initials = name
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part.charAt(0))
      .join('')
      .toLocaleUpperCase('pt-BR');
    const colors = ['avatar-lilac', 'avatar-green', 'avatar-peach', 'avatar-blue', 'avatar-pink'];
    const color = colors[this.clients().length % colors.length];

    this.clients.update((clients) => [
      { name, email, category: 'Novo cliente', projects: 0, total: '0,00', status: 'Ativo', initials, color },
      ...clients,
    ]);
    this.newClientName.set('');
    this.newClientEmail.set('');
    this.closeClientForm();
    this.showToast(`${name} foi adicionado à sua carteira.`);
  }

  protected exportClients(): void {
    const rows = [
      ['Cliente', 'E-mail', 'Categoria', 'Projetos', 'Valor total', 'Status'],
      ...this.clients().map((client) => [
        client.name,
        client.email,
        client.category,
        String(client.projects),
        `R$ ${client.total}`,
        client.status,
      ]),
    ];
    const csv = rows.map((row) => row.map((cell) => `"${cell.replaceAll('"', '""')}"`).join(';')).join('\r\n');
    const blob = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'nexus-clientes.csv';
    link.click();
    URL.revokeObjectURL(url);
    this.showToast('Relatório de clientes exportado.');
  }

  protected chartAreaPoints(points: string): string {
    return `0,190 ${points} 700,190`;
  }

  protected showToast(message: string): void {
    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
    }
    this.toastMessage.set(message);
    this.toastTimer = setTimeout(() => this.toastMessage.set(''), 3000);
  }

  private toChartPoints(values: number[]): string {
    return values.map((value, index) => `${(index * 700) / (values.length - 1)},${value}`).join(' ');
  }
}
