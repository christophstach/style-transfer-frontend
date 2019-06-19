import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { StylesStore } from '../stores/styles.store';
import { Style } from '../models/style.model';
import { ID } from '@datorama/akita';


export interface ApplyStyleResponse {
  data: {
    elapsedTime: number;
    styledImageUrl: string;
  };
}

export interface ListStylesResponse {
  data: Style[];
}

@Injectable({
  providedIn: 'root'
})
export class StylesService {
  constructor(private http: HttpClient, private stylesStore: StylesStore) {
  }

  apply(image: File | Blob, style: string, cuda = false): Observable<ApplyStyleResponse> {
    const formData = new FormData();

    if (image) {
      if (image instanceof File) {
        formData.append('image', image, image.name);
      } else {
        formData.append('image', image, 'webcam.jpg');
      }
    } else {
      alert('You have to provide an image.');
      return null;
    }

    if (cuda) {
      return this.http
        .post<ApplyStyleResponse>(`${environment.apiHost}/style-transfer/apply/cuda/${style}`, formData).pipe(
          map(response => {
            return {
              data: {
                ...response.data,
                styledImageUrl: environment.apiHost + response.data.styledImageUrl
              }
            };
          })
        );
    } else {
      return this.http
        .post<ApplyStyleResponse>(`${environment.apiHost}/style-transfer/apply/cpu/${style}`, formData).pipe(
          map(response => {
            return {
              data: {
                ...response.data,
                styledImageUrl: environment.apiHost + response.data.styledImageUrl
              }
            };
          })
        );
    }
  }

  list(): Observable<Style[]> {
    return this.http
      .get<ListStylesResponse>(`${environment.apiHost}/style-transfer/list-styles`)
      .pipe(
        map(response => response.data),
        tap(styles => {
          this.stylesStore.set(styles);
        })
      );
  }

  setActive(id: ID) {
    this.stylesStore.setActive(id);
  }

  updateTutorial(value: boolean) {
    this.stylesStore.updateTutorial(value);
  }
}
