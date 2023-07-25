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
        component: VotesComponent,
        data: {
          roles: [
            'voter'
          ]
        }, 
      },
      {
        path: 'result/:id',
        component: ResultComponent,
        data: {
          roles: [
            'voter',
            'committee',
            'adminops'
          ]
        } 
      },
      {
        path: 'elections/result',
        component: ElectionsComponent,
        data: {
          roles: [
            'voter',
            'committee',
            'adminops'
          ]
        } 
      },
      {
        path: 'candidates',
        component: CandidatesComponent,
        data: {
          roles: [
            'committee'
          ]
        } 
      },
      {
        path: 'event',
        component: EventComponent,
        data: {
          roles: [
            'committee'
          ]
        } 
      },
      {
        path: 'elections/vote',
        component: ElectionsComponent,
        data: {
          roles: [
            'voter'
          ]
        }, 
      },
      {
        path: 'elections',
        component: ElectionsComponent,
        data: {
          roles: [
            'committee',
            'adminops'
          ]
        } 
      },
      {
        path: 'election/:id',
        component: ElectionDetailComponent,
        data: {
          roles: [
            'committee',
            'adminops'
          ]
        } 
      },
      {
        path: 'ballot/:joint_id',
        component: BallotComponent,
        data: {
          roles: [
            'committee',
            'adminops'
          ]
        } 
      },
      {
        path: 'register',
        component: RegisterUserComponent,
        data: {
          roles: [
            'committee',
            'adminops'
          ]
        } 
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
