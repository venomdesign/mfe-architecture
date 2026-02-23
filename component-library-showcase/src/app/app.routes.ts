import { Routes } from '@angular/router';
import { OverviewComponent } from './pages/overview/overview.component';
import { ButtonsComponent } from './pages/buttons/buttons.component';
import { BadgesComponent } from './pages/badges/badges.component';
import { CardsComponent } from './pages/cards/cards.component';
import { AlertsComponent } from './pages/alerts/alerts.component';
import { GridShowcaseComponent } from './pages/grid/grid.component';
import { ScheduleShowcaseComponent } from './pages/schedule/schedule.component';
import { ApiDocsComponent } from './pages/api-docs/api-docs.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'overview',
    pathMatch: 'full'
  },
  {
    path: 'overview',
    component: OverviewComponent
  },
  {
    path: 'buttons',
    component: ButtonsComponent
  },
  {
    path: 'badges',
    component: BadgesComponent
  },
  {
    path: 'cards',
    component: CardsComponent
  },
  {
    path: 'alerts',
    component: AlertsComponent
  },
  {
    path: 'grid',
    component: GridShowcaseComponent
  },
  {
    path: 'schedule',
    component: ScheduleShowcaseComponent
  },
  {
    path: 'api-docs',
    component: ApiDocsComponent
  }
];
