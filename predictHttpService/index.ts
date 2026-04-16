export * from './src/lib/getAllMatchesApi/services/bundesligaMatchesController.service';
import { BundesligaMatchesControllerService } from './src/lib/getAllMatchesApi/services/bundesligaMatchesController.service';
export * from './src/lib/getAllMatchesApi/services/footballController.service';
import { FootballControllerService } from './src/lib/getAllMatchesApi/services/footballController.service';
export * from './src/lib/getAllMatchesApi/services/getTodayMatchesController.service';
import { GetTodayMatchesControllerService } from './src/lib/getAllMatchesApi/services/getTodayMatchesController.service';
export * from './src/lib/getAllMatchesApi/services/laLigaMatchController.service';
import { LaLigaMatchControllerService } from './src/lib/getAllMatchesApi/services/laLigaMatchController.service';
export * from './src/lib/getAllMatchesApi/services/ligueOneController.service';
import { LigueOneControllerService } from './src/lib/getAllMatchesApi/services/ligueOneController.service';
export * from './src/lib/getAllMatchesApi/models/match'
export const APIS = [
  BundesligaMatchesControllerService,
  FootballControllerService,
  GetTodayMatchesControllerService,
  LaLigaMatchControllerService,
  LigueOneControllerService,
];
