import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Style } from '../models/style.model';
import { Injectable } from '@angular/core';


export interface StylesState extends EntityState<Style> {
  ui: {
    tutorial: boolean
  };
}

const initialState: StylesState = {
  ui: {
    tutorial: true
  }
};

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'styles'})
export class StylesStore extends EntityStore<StylesState, Style> {
  constructor() {
    super(initialState);
  }

  updateTutorial(value: boolean) {
    this.update({
      ui: {
        ...this._value().ui,
        tutorial: value
      }
    });
  }
}
