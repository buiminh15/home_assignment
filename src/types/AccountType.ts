interface AccountPayload {
  title: string;
  startAt: string;
  venue: string;
  capacity: number;
  price?: number;
  description: string;
  isManualApprove?: boolean;
  privacy: string;
  banner: string;
  tags: string[];
}

interface AccountResponse extends AccountPayload {
  id: string;
  questionnaire: string;
}

export type { AccountPayload, AccountResponse };
