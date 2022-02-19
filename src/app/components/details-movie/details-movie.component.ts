import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommentType, Details, EpisodeVoType, SubList, User } from 'src/app/model';
import { AuthService } from 'src/app/services/auth.service';
import { CommentsService } from 'src/app/services/comments.service';
import * as moment from 'moment';

@Component({
  selector: 'app-details-movie',
  templateUrl: './details-movie.component.html',
  styleUrls: ['./details-movie.component.scss']
})
export class DetailsMovieComponent implements OnInit,OnDestroy {
  @ViewChild('commentInput', { static: true }) commentInput: ElementRef;
  @ViewChild('f') form: NgForm;
  @Input() detailData: Details;
  @Input() subList: SubList[];
  @Output() onClickEpisode = new EventEmitter();
  user: User | undefined;
  episode: number;
  routeSub: Subscription;
  id: string;
  cmtData: CommentType[];
  
  constructor(private activatedRoute: ActivatedRoute, private route: ActivatedRoute, public auth: AuthService, private comment: CommentsService) {}

  ngOnInit(): void {
    this.routeSub = this.route.queryParams.subscribe((param: Params) => {
      this.episode = +param['episode'] || 1;
    })

    this.auth.user$.subscribe(data => {
      if(data) this.user = data;
    })

    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.fetchAllComment();
    })
  }

  onClickEpi(epiItem: EpisodeVoType){
    this.onClickEpisode.emit(epiItem);
  }

  subtitleProxy(url: string) {
    return `https://srt-to-vtt.vercel.app?url=${encodeURIComponent(url)}`;
  }

  fetchAllComment(){
    this.comment.fetchComments(this.id).subscribe((data:CommentType[]) => {
      this.cmtData = data;
    });
  }

  calDayPassed(createdAt: Date){
    const time1 = moment(new Date(createdAt));
    const time2 = moment(new Date());
    return time1.from(time2);
  }

  onSubmit(f: NgForm){
    if(f.value.comment === "") return;
    if(this.user){
      const data: CommentType = {
        user: this.user,
        content: f.value.comment,
        createdAt: new Date()
      }
      this.comment.onCreateComments(data, this.id);
    }
    this.form.resetForm();
    this.fetchAllComment();
  }

  ngOnDestroy(): void {
      if(this.routeSub) this.routeSub.unsubscribe();
  }
}
