export { NationalGeographicAPI } from './api/NationalGeographicAPI';

export interface NewsPayload {
  leadMedia: {
    altText: string,
    aspectRatio: number,
    height: number,
    width: number
    internal: boolean,
    isVideo: boolean,
    url: string,
  };
  page: {
    abstract: string,
    publishDate: Date,
    series: string,
    sponsorContentLabel: string,
    sponsored: boolean,
    title: string,
    type: string,
    url: string,
  };
}

export interface PhotoPayloadEntryRendition {
  density: number;
  uri: string;
  width: number;
}

export interface PhotoPayloadEntry {
  attributes: {
    image: {
      alt_text: string,
      aspect_ratio: number,
      asset_provider: any[],
      caption: string,
      credit: string,
      croppings: any[],
      height: number,
      order: number,
      renditions: PhotoPayloadEntryRendition[],
      rights_system: {
        id: number,
        name: string,
        uri: string,
      },
      source_system: {
        account: string,
        asset_external_field_name: string,
        asset_id: string,
        id: string,
        uri: string,
      },
      title: string,
      uri: string,
      width: number,
    },
    uri: string,
  };
  id: string;
  links:{
    self: string,
  };
  type: string;
}

export interface PhotoPayload {
  data: PhotoPayloadEntry[];
  jsonapi: {
    version: string,
  };
  links: {
    first: string,
    next: string,
    last: string,
    self: string,
  };
  meta: {
    feeds: number,
    pages: number,
  };
}
