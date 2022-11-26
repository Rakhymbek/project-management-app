import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../../core/services/search.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent implements OnInit {
  constructor(public search: SearchService) {}

  ngOnInit(): void {
    console.log(this.search.filteredTasks);
  }
}
