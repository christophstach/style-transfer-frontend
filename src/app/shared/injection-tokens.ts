import { InjectionToken } from '@angular/core';

export const NAVIGATOR_TOKEN = new InjectionToken<ExtendedNavigator>('The window navigator with Web Share API Level 2 feature', {
  providedIn: 'root',
  factory: () => window.navigator
});
