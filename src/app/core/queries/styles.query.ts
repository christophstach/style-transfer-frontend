import { ID, QueryEntity } from '@datorama/akita';
import { StylesState, StylesStore } from '../stores/styles.store';
import { Style } from '../models/style.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StylesQuery extends QueryEntity<StylesState, Style> {
  selectTutorial$ = this.select(state => state.ui.tutorial);

  constructor(protected store: StylesStore) {
    super(store);
  }

}
