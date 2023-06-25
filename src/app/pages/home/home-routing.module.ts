import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidatesComponent } from './candidates/candidates.component';
import { HomeComponent } from './home.component';
import { LandingComponent } from './landing/landing.component';
import { ResultComponent } from './result/result.component';
import { VotesComponent } from './votes/votes.component';
import { EventComponent } from './event/event.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: LandingComponent
      },
      {
        path: 'votes',
        component: VotesComponent
      },
      {
        path: 'result',
        component: ResultComponent
      },
      {
        path: 'candidates',
        component: CandidatesComponent
      },
      {
        path: 'event',
        component: EventComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
