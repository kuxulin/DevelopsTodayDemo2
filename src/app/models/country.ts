import { Holiday } from './holiday';

export interface Country {
  name: string;
  countryCode: string;
  closestHoliday: Holiday;
}
