// src/app/shared/models/ui-config.ts
export interface FilterConfig {
    name: string;              // chave no form
    label?: string;            // label do campo
    type: 'text' | 'select' | 'date';
    placeholder?: string;
    options?: Array<{ label: string; value: any }>; // só para select
    class?: string;            // para grid
}

export interface TableColumn {
    key: string;               // propriedade no objeto
    header: string;            // texto do header
    width?: string;
    align?: 'left' | 'right' | 'center';
}

