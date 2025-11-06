export interface NavItem {
    icon: string;
    label: string;
    route?: string;
    children?: Array<{ label: string; route: string }>;
}

