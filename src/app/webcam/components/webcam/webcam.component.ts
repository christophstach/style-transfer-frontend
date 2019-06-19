import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { WebcamImage, WebcamInitError } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { dataUrlToBlob } from '../../../core/helpers/data-url-to-blob';
import { ApplyStyleResponse, StylesService } from '../../../core/services/styles.service';
import { StylesQuery } from '../../../core/queries/styles.query';
import { Style } from '../../../core/models/style.model';
import { saveAs } from 'file-saver';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-webcam',
  templateUrl: './webcam.component.html',
  styleUrls: ['./webcam.component.scss']
})
export class WebcamComponent implements OnInit {
  @ViewChild('webcamPreview', {static: false}) webcamPreview: ElementRef<HTMLImageElement>;
  @ViewChild('styledImageEmpty', {static: false}) styledImageEmpty: ElementRef<HTMLDivElement>;
  @ViewChild('styledImage', {static: false}) styledImage: ElementRef<HTMLImageElement>;

  webcamImage: WebcamImage;
  webcamCaptureTrigger$: Subject<void> = new Subject<void>();
  error: any;
  loading: boolean;
  apiResponse: ApplyStyleResponse;
  hasShareFeature: boolean;
  videoOptions: MediaTrackConstraints = {
    width: 1440,
    echoCancellation: false,
    logicalSurface: false
  };

  isHandset$: Observable<boolean>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private stylesService: StylesService,
    private stylesQuery: StylesQuery
  ) {
    this.hasShareFeature = !!((window.navigator as any).share);

    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map(value => value.matches)
    );
  }

  ngOnInit() {
  }

  onImageCapture(webcamImage: WebcamImage) {
    this.webcamImage = webcamImage;

    setTimeout(() => {
      this.webcamPreview.nativeElement.scrollIntoView({behavior: 'smooth'});
    });
  }

  onInitError(error: WebcamInitError) {
    this.error = error;
    alert(error.message);
  }

  capture(event: Event) {
    event.preventDefault();
    this.webcamCaptureTrigger$.next();
  }

  stylize(event: Event) {
    event.preventDefault();

    const blob = dataUrlToBlob(this.webcamImage.imageAsDataUrl);
    const observable = this.stylesService.apply(blob, (this.stylesQuery.getActive() as Style).id.toString());

    if (observable) {
      this.loading = true;
      this.apiResponse = null;
      this.error = null;

      setTimeout(() => {
        this.styledImageEmpty.nativeElement.scrollIntoView({behavior: 'smooth'});
      });

      observable.subscribe(
        response => {
          this.loading = false;
          this.apiResponse = response;
          this.error = null;

          setTimeout(() => {
            this.styledImage.nativeElement.scrollIntoView({behavior: 'smooth'});
          });
        }, error => {
          this.loading = false;
          this.apiResponse = null;
          this.error = error;
        }
      );
    }
  }

  download(event: Event) {
    event.preventDefault();

    saveAs(this.apiResponse.data.styledImageUrl);
  }

  share(event: Event) {
    event.preventDefault();

    if (this.hasShareFeature) {
      (window.navigator as any).share({
        title: 'Stylized',
        text: 'Image styled with stylized',
        url: this.apiResponse.data.styledImageUrl
      } as any);
    }
  }

  previous(event: Event) {
    event.preventDefault();

    if (this.apiResponse) {
      this.apiResponse = null;
      this.loading = null;
      this.error = null;
    } else {
      this.webcamImage = null;
    }

    setTimeout(() => {
      this.webcamPreview.nativeElement.scrollIntoView({behavior: 'smooth'});
    });
  }
}
