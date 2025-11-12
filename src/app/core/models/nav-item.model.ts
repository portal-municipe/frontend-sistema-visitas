export interface NavItem {
    icon: string;
    labelKey: string;
    route?: string;
    children?: Array<{ labelKey: string; route: string }>;
}

