export interface Certificate {
  id: string;
  title: string;
  institution: string;
  year: number;
  date?: string;
  summary: string;
  tags: string[];
  certificate: string;
  preview: string;
  credentialUrl?: string;
  credentialCode?: string;
}
