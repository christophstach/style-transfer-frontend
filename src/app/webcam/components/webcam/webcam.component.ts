import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { WebcamImage, WebcamInitError } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { dataUrlToBlob } from '../../../core/helpers/data-url-to-blob';
import { ApplyStyleResponse, StylesService } from '../../../core/services/styles.service';
import { StylesQuery } from '../../../core/queries/styles.query';
import { Style } from '../../../core/models/style.model';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { NAVIGATOR_TOKEN } from '../../../shared/injection-tokens';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-webcam',
  templateUrl: './webcam.component.html',
  styleUrls: ['./webcam.component.scss']
})
export class WebcamComponent {
  @ViewChild('webcamPreview', {static: false}) webcamPreview: ElementRef<HTMLImageElement>;
  @ViewChild('styledImageEmpty', {static: false}) styledImageEmpty: ElementRef<HTMLDivElement>;
  @ViewChild('styledImage', {static: false}) styledImage: ElementRef<HTMLImageElement>;

  webcamImage: WebcamImage;
  webcamCaptureTrigger$: Subject<void> = new Subject<void>();
  error: any;
  loading: boolean;
  apiResponse: ApplyStyleResponse;
  hasShareFeature: boolean;
  hasExtendedShareFeature: boolean;
  videoOptions: MediaTrackConstraints = {
    width: 1440,
    echoCancellation: false,
    logicalSurface: false
  };

  isHandset$: Observable<boolean>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private stylesService: StylesService,
    private stylesQuery: StylesQuery,
    private toastrService: NbToastrService,
    @Inject(NAVIGATOR_TOKEN) private navigator: ExtendedNavigator
  ) {
    this.hasShareFeature = !!this.navigator.share;
    this.hasExtendedShareFeature = this.hasShareFeature && !!this.navigator.canShare;

    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map(value => value.matches)
    );
  }


  onImageCapture(webcamImage: WebcamImage) {
    this.webcamImage = webcamImage;

    setTimeout(() => {
      this.webcamPreview.nativeElement.scrollIntoView({behavior: 'smooth'});
    });
  }

  onInitError(error: WebcamInitError) {
    this.error = error;

    this.toastrService.danger(error.message, 'Error');
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

          this.toastrService.danger(error.message, 'Error');
        }
      );
    }
  }

  download(event: Event) {
    event.preventDefault();

    saveAs(this.apiResponse.data.styledImageUrl, 'stylized-webcam.jpg');
  }

  async share(event: Event) {
    event.preventDefault();

    if (this.hasShareFeature) {
      const file = await fetch(this.apiResponse.data.styledImageUrl)
        .then(response => response.blob())
        .then(blob => new File([blob], 'temp.jpg', {
          type: 'image/jpeg',
          lastModified: Date.now()
        }));

      if (this.hasExtendedShareFeature && this.navigator.canShare({files: [file]})) {
        this.navigator.share({
          title: 'Stylized',
          text: 'Image styled with Stylized',
          files: [file]
        }).then().catch(error => this.toastrService.danger(error, 'Error'));
      } else {
        this.navigator.share({
          title: 'Stylized',
          text: 'Image styled with Stylized',
          url: this.apiResponse.data.styledImageUrl
        }).then().catch(error => this.toastrService.danger(error, 'Error'));
      }
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
  }
}
