import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Style } from '../../../core/models/style.model';
import { ApplyStyleResponse, StylesService } from '../../../core/services/styles.service';
import { StylesQuery } from '../../../core/queries/styles.query';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  @ViewChild('styledImageEmpty', { static: false }) styledImageEmpty: ElementRef<HTMLDivElement>;
  @ViewChild('styledImage', { static: false }) styledImage: ElementRef<HTMLImageElement>;
  @ViewChild('uploadInput', { static: true }) uploadInput: ElementRef<HTMLInputElement>;

  error: any;
  loading: boolean;
  apiResponse: ApplyStyleResponse;
  selectedImage: File;
  hasShareFeature: boolean;


  constructor(private stylesQuery: StylesQuery, private stylesService: StylesService) {
    this.hasShareFeature = !!((window.navigator as any).share);
  }

  ngOnInit() {
  }

  onFileChange(event: Event) {
    event.preventDefault();

    this.selectedImage = (event.target as HTMLInputElement).files.item(0);
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
