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
import { HttpClientModule } from '@angular/common/http';
import { UserService } from 'src/app/service/user.service';


@NgModule({
  declarations: [
    CandidatesComponent,
    LandingComponent,
    ResultComponent,
    VotesComponent,
    EventComponent
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
    VoteService
  ]
})
export class HomeModule { }
