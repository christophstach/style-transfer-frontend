import { Component, OnInit, ViewChild } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { Style } from '../../models/style.model';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { ID } from '@datorama/akita';
import { StylesService } from '../../services/styles.service';
import { StylesQuery } from '../../queries/styles.query';
import { NbPopoverDirective, NbSidebarService } from '@nebular/theme';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  styles$: Observable<Style[]>;
  activeStyle$: Observable<Style>;

  constructor(
    private stylesService: StylesService,
    private stylesQuery: StylesQuery,
    private sidebarService: NbSidebarService
  ) {
    this.activeStyle$ = this.stylesQuery.selectActive() as Observable<Style>;
    this.stylesService.list().subscribe();

    this.styles$ = this.stylesQuery.selectAll();

    this.stylesQuery.selectFirst().pipe(
      filter(Boolean)
    ).subscribe(style => {
      if (!this.stylesQuery.getActive()) {
        this.stylesService.setActive(style.id);
      }
    });
  }

  ngOnInit() {
  }


  selectStyle(id: ID) {
    this.stylesService.setActive(id);

    this.sidebarService.toggle(false, 'main');
  }
}
