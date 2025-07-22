export interface BreadcrumbDropdownOption {
  label: string;
  href: string;
  description?: string;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
  isCurrentPage?: boolean;
  dropdownOptions?: BreadcrumbDropdownOption[];
}
