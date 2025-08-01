export interface VerifyConditionFormData {
  selectedCondition: string;
  proofDetails: string;
  selectedFile: File | null;
}

export interface VerifyConditionFormProps {
  onSubmit: (formData: VerifyConditionFormData) => void;
  onCancel: () => void;
} 