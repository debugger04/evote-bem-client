import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { CandidatesComponent } from './candidates/candidates.component';
import { LandingComponent } from './landing/landing.component';
import { ResultComponent } from './result/result.component';
import { VotesComponent } from './votes/votes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventComponent } from './event/event.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { VoteService } from 'src/app/service/vote.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UserService } from 'src/app/service/user.service';
import { NetworkInterceptor } from 'src/app/interceptor/network.interceptor';
import { ElectionsComponent } from './elections/elections.component';
import { ElectionDetailComponent } from './election-detail/election-detail.component';
import { BallotComponent } from './ballot/ballot.component';


@NgModule({
  declarations: [
    CandidatesComponent,
    LandingComponent,
    ResultComponent,
    VotesComponent,
    EventComponent,
    ElectionsComponent,
    ElectionDetailComponent,
    BallotComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [
    HttpClientModule,
    UserService,
    VoteService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NetworkInterceptor,
      multi: true
    }
  ]
})
export class HomeModule { }
