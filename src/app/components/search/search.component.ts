import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, fromEvent, map, Subscription } from 'rxjs';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  @ViewChild('movieSearchInput', { static: true }) movieSearchInput: ElementRef;
  @ViewChild('f') form: NgForm;
  
  suggestionData: string[] = [];
  focus: boolean = false;

  suggestionSub: Subscription;

  constructor(private router: Router, private searchService: SearchService) { }

  ngOnInit(): void {
    this.suggestionSub = fromEvent(this.movieSearchInput.nativeElement, 'keyup').pipe(
      map((event: any) => {
        return event.target.value;
      }), 
      debounceTime(1000),
      distinctUntilChanged(),
    ).subscribe((text: string) => {
      this.searchService.searchKeywords(text.trim()).subscribe(data => {
        this.suggestionData = data.data.searchResults;
      })
    })
  }

  htmlToText(html: string): string{
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent as string;
  }
  
  onSubmit(f: NgForm){
    if(f.value.keyword === "") return;
    this.router.navigate(['search'], { queryParams: { q: encodeURIComponent(f.value.keyword) } });
    this.form.resetForm();
  }

  onNavigate(keyword: string){
    
    this.router.navigate(['search'], { queryParams: { q: encodeURIComponent(keyword) } });
    this.suggestionData = [];
    this.form.resetForm();
  }

  onFocus(){
    this.focus = true;
  }

  onClickedOutside() {
    this.focus = false;
  }

  ngOnDestroy(): void {
    if(this.suggestionSub) this.suggestionSub.unsubscribe();
  }
  
}
