import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidatesComponent } from './candidates/candidates.component';
import { HomeComponent } from './home.component';
import { LandingComponent } from './landing/landing.component';
import { ResultComponent } from './result/result.component';
import { VotesComponent } from './votes/votes.component';
import { EventComponent } from './event/event.component';
import { ElectionsComponent } from './elections/elections.component';
import { ElectionDetailComponent } from './election-detail/election-detail.component';
import { BallotComponent } from './ballot/ballot.component';
import { RegisterUserComponent } from './register-user/register-user.component';

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
        path: 'votes/:id',
        component: VotesComponent
      },
      {
        path: 'result/:id',
        component: ResultComponent
      },
      {
        path: 'elections/result',
        component: ElectionsComponent
      },
      {
        path: 'candidates',
        component: CandidatesComponent
      },
      {
        path: 'event',
        component: EventComponent
      },
      {
        path: 'elections',
        component: ElectionsComponent
      },
      {
        path: 'election/:id',
        component: ElectionDetailComponent
      },
      {
        path: 'ballot',
        component: BallotComponent
      },
      {
        path: 'register',
        component: RegisterUserComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
