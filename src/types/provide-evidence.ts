export interface ProvideEvidenceDisputeData {
  transactionId: string;
  disputeReason: string;
  disputedBy: string;
  against: string;
}

export interface ProvideEvidenceDisputeSummaryProps {
  dispute: ProvideEvidenceDisputeData;
}

export interface ProvideEvidenceUploadProps {
  onFilesSelected?: (files: File[]) => void;
}

export interface ProvideEvidenceMessageProps {
  onMessageChange?: (message: string) => void;
} 