export interface SleepDurationResponse {
  date: number;
  duration: number;
  dayPart?: string | null;
  minDaySleeping: number;
  maxDaySleeping: number;
  minNightSleeping: number;
  maxNightSleeping: number;
  minSummarySleeping: number;
  maxSummarySleeping: number;
}

export interface SleepDurationResponseTotal {
  date: number;
  dayDuration: number;
  nightDuration: number;
  totalDuration: number;
  dayPart?: string | null;
  minDaySleeping: number;
  maxDaySleeping: number;
  minNightSleeping: number;
  maxNightSleeping: number;
  minSummarySleeping: number;
  maxSummarySleeping: number;
}

export interface SleepDurationRequest {
  childId: number;
  startDay: number;
  startMonth: number;
  startYear: number;
  endDay: number;
  endMonth: number;
  endYear: number;
  dayPart: string | null;
}
