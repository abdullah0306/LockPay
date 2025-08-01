export interface DisputeData {
  id: string;
  status: string;
  filedBy: string;
  filedOn: string;
  arbitrator: string;
  asset: string;
}

export interface EvidenceItem {
  id: string;
  name: string;
  type: string;
  fullName: string;
}

export interface DisputeOverviewProps {
  dispute: DisputeData;
}

export interface EvidenceSubmittedProps {
  evidence: EvidenceItem[];
  onViewEvidence: (evidenceId: string) => void;
} 