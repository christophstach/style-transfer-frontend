import { ID } from '@datorama/akita';

export interface Style {
  id: ID;
  bottleneckSize: number;
  bottleneckType: string;
  network: string;
  channelMultiplier: number;
  contentImageSize: number;
  contentWeight: number;
  expansionFactor: number;
  name: string;
  styleImageSize: number;
  styleWeight: number;
  totalVariationWeight: number;
  styleImage: string;
  metaData: {
    attribution: {
      name?: string;
      author?: string;
      authorUrl?: string;
      publishedUrl?: string;
      publisher?: string;
      publisherUrl?: string;
      termsOfUseUrl?: string
    };
  };
}
