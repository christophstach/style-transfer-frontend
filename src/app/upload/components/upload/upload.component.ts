import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { Style } from '../../../core/models/style.model';
import { ApplyStyleResponse, StylesService } from '../../../core/services/styles.service';
import { StylesQuery } from '../../../core/queries/styles.query';
import { saveAs } from 'file-saver';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NAVIGATOR_TOKEN } from '../../../shared/injection-tokens';
import { NbToastrService } from '@nebular/theme';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {
  @ViewChild('styledImageEmpty', {static: false}) styledImageEmpty: ElementRef<HTMLDivElement>;
  @ViewChild('styledImage', {static: false}) styledImage: ElementRef<HTMLImageElement>;
  @ViewChild('uploadInput', {static: false}) uploadInput: ElementRef<HTMLInputElement>;

  error: any;
  loading: boolean;
  apiResponse: ApplyStyleResponse;
  selectedImage: File;
  hasShareFeature: boolean;
  hasExtendedShareFeature: boolean;

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


  onFileChange(event: Event) {
    event.preventDefault();

    this.selectedImage = (event.target as HTMLInputElement).files.item(0);
  }

  onChooseFile(event: Event) {
    event.preventDefault();

    this.uploadInput.nativeElement.click();
  }

  onRemoveFile(event: Event) {
    event.preventDefault();

    this.selectedImage = null;
  }

  stylize(event: Event) {
    event.preventDefault();

    const observable = this.stylesService.apply(this.selectedImage, (this.stylesQuery.getActive() as Style).id.toString());

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

    const fileName = this.uploadInput.nativeElement.files.item(0).name.split('.').slice(0, -1).join('.');
    saveAs(this.apiResponse.data.styledImageUrl, 'stylized-' + fileName + '.jpg');
  }

  async share(event: Event) {
    event.preventDefault();

    if (this.hasShareFeature) {
      const file = await fetch(this.apiResponse.data.styledImageUrl)
        .then(response => response.blob())
        .then(blob => new File([blob], 'temp.jpg'));

      if (this.hasExtendedShareFeature && this.navigator.canShare({files: [file]})) {
        this.navigator.share({
          title: 'Stylized',
          text: 'Image styled with stylized',
          files: [file]
        }).then().catch(error => this.toastrService.danger(error, 'Error'));
      } else {
        this.navigator.share({
          title: 'Stylized',
          text: 'Image styled with stylized',
          url: this.apiResponse.data.styledImageUrl
        }).then().catch(error => this.toastrService.danger(error, 'Error'));
      }

    }
  }

  cancel(event: Event) {
    event.preventDefault();

    this.apiResponse = null;
    this.loading = false;
    this.error = false;

    setTimeout(() => {
      this.uploadInput.nativeElement.scrollIntoView({behavior: 'smooth'});
    });
  }

}
