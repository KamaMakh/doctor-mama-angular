export interface ChildrenResponse {
  totalChildCount: number;
  children: Children[];
}

export interface Children {
  childId: number;
  childName: string;
  childSex: string;
  dateBirth: number;
  dateBirthEstimated: number;
  userEmail: string;
  breastFeeding: boolean;
  bottleFeeding: boolean;
  daySleeping: number;
  summaryDaySleeping: number;
  nightSleeping: number;
  wakePeriod: number;
  childStatus: boolean;
}
