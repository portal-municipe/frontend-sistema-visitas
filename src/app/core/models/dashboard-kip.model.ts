type KpiVariant = 'default' | 'warning' | 'success' | 'info' | 'danger';

export interface DashboardKpi {
    label: string;
    value: string | number;
    sublabel: string;
    variant: KpiVariant;
    icon?: string;
}

