import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NbPopoverDirective, NbSidebarService } from '@nebular/theme';
import { Router, RouterStateSnapshot } from '@angular/router';
import { RouterQuery } from '@datorama/akita-ng-router-store';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { StylesQuery } from '../../queries/styles.query';
import { StylesService } from '../../services/styles.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, AfterViewInit {
  @ViewChild(NbPopoverDirective) actionsPopover: NbPopoverDirective;

  routedUrl$: Observable<string>;
  tutorial$: Observable<boolean>;
  isHandset$: Observable<boolean>;


  constructor(
    private breakpointObserver: BreakpointObserver,
    private sidebarService: NbSidebarService,
    private router: Router,
    private routerQuery: RouterQuery,
    private stylesQuery: StylesQuery,
    private stylesService: StylesService
  ) {
    this.routedUrl$ = this.routerQuery.select().pipe(
      map(parameters => parameters.state),
      filter(Boolean),
      map((state: RouterStateSnapshot) => state.url),
    );

    this.tutorial$ = this.stylesQuery.selectTutorial$;

    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map(value => value.matches)
    );
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.tutorial$.subscribe(tutorial => {
      if (tutorial) {
        this.actionsPopover.show();

        setTimeout(() => {
          this.actionsPopover.hide();
        }, 10000);

        this.stylesService.updateTutorial(false);
      }
    });
  }


  toggleSidebar(event: Event) {
    event.preventDefault();

    this.sidebarService.toggle(false, 'main');
  }

  routeToCamera(event: Event) {
    event.preventDefault();

    this.router.navigate(['/']);
  }

  routeToUpload(event: Event) {
    event.preventDefault();

    this.router.navigate(['/upload']);
  }
}
