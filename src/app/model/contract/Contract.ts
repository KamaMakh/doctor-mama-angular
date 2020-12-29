export interface ContractResponse {
  totalContractCount: number;
  contracts?: Contract[];
}

export interface Contract {
  id: number;
  userEmail: string;
  childName: string;
  contractType: string;
  consultantId: number;
  contractDate: number;
  contractStatus: string;
  preferredCommunicationMethod?: PreferredCommunicationMethod | null;
}

export interface PreferredCommunicationMethod {
  'hasTelegram': boolean;
  'hasWhatsapp': boolean;
  'hasViber': boolean;
  'phoneNumber': string | number;
  'contactEmail': string;
}
