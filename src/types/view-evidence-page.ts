export interface ViewEvidenceData {
  id: string;
  title: string;
  type: string;
  uploadedBy: string;
  uploadDate: string;
  description: string;
}

export interface ViewEvidenceDetailsProps {
  evidence: ViewEvidenceData;
} 