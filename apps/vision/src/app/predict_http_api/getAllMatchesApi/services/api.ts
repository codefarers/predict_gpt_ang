export * from './bundesligaMatchesController.service';
import { BundesligaMatchesControllerService } from './bundesligaMatchesController.service';
export * from './footballController.service';
import { FootballControllerService } from './footballController.service';
export * from './getTodayMatchesController.service';
import { GetTodayMatchesControllerService } from './getTodayMatchesController.service';
export * from './laLigaMatchController.service';
import { LaLigaMatchControllerService } from './laLigaMatchController.service';
export * from './ligueOneController.service';
import { LigueOneControllerService } from './ligueOneController.service';
export const APIS = [
  BundesligaMatchesControllerService,
  FootballControllerService,
  GetTodayMatchesControllerService,
  LaLigaMatchControllerService,
  LigueOneControllerService,
];
