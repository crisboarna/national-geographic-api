/* eslint-disable semi */
'use strict';

import { makeRequest } from '../util/utils';

const LN_API_URL = 'http://www.nationalgeographic.com/bin/services/core/public/query/content.json?contentTypes=adventure/components/pagetypes/story/article,adventure/components/pagetypes/story/gallery,adventure/components/pagetypes/story/interactive,adventure/components/pagetypes/story/multipage,animals/components/pagetypes/story/article,animals/components/pagetypes/story/gallery,animals/components/pagetypes/story/interactive,animals/components/pagetypes/story/multipage,archaeologyandhistory/components/pagetypes/story/article,archaeologyandhistory/components/pagetypes/story/gallery,archaeologyandhistory/components/pagetypes/story/interactive,archaeologyandhistory/components/pagetypes/story/multipage,environment/components/pagetypes/story/article,environment/components/pagetypes/story/gallery,environment/components/pagetypes/story/interactive,environment/components/pagetypes/story/multipage,magazine/components/pagetypes/story/article,magazine/components/pagetypes/story/gallery,magazine/components/pagetypes/story/interactive,magazine/components/pagetypes/story/multipage,news/components/pagetypes/story/article,news/components/pagetypes/story/gallery,news/components/pagetypes/story/interactive,news/components/pagetypes/story/multipage,parks/components/pagetypes/story/article,parks/components/pagetypes/story/gallery,parks/components/pagetypes/story/interactive,parks/components/pagetypes/story/multipage,peopleandculture/components/pagetypes/story/article,peopleandculture/components/pagetypes/story/gallery,peopleandculture/components/pagetypes/story/interactive,peopleandculture/components/pagetypes/story/multipage,photography/components/pagetypes/story/article,photography/components/pagetypes/story/gallery,photography/components/pagetypes/story/interactive,photography/components/pagetypes/story/multipage,science/components/pagetypes/story/article,science/components/pagetypes/story/gallery,science/components/pagetypes/story/interactive,science/components/pagetypes/story/multipage,travel/components/pagetypes/story/article,travel/components/pagetypes/story/gallery,travel/components/pagetypes/story/interactive,travel/components/pagetypes/story/multipage&sort=newest&operator=or&includedTags=&excludedTags=ngs_genres:reference,ngs_visibility:omit_from_hp&excludedGuids=beda7baa-e63b-4276-8122-34e47a4e653e';
const DEFAULT_PAGE_SIZE = 3;

export class API {
  static getLatestNews (pageSize, pageNumber, cb) {
    let callback;
    if (arguments.length === 3) {
      callback = cb;
    } else if (arguments.length === 2) {
      if (Object.prototype.toString.call(arguments[1]) === '[object Function]') {
        callback = pageNumber;
      }
    } else if (arguments.length === 1) {
      if (Object.prototype.toString.call(arguments[0]) === '[object Function]') {
        callback = pageSize;
      }
    }

    const queryPageSize = isNaN(pageSize) ? DEFAULT_PAGE_SIZE : pageSize;
    const queryPageNumber = isNaN(pageNumber) ? 0 : pageNumber;

    const url = `${LN_API_URL}&pageSize=${queryPageSize}&page=${queryPageNumber}`;

    const requestOptions = {
      url: url,
      method: 'GET'
    };

    return makeRequest(requestOptions, callback);
  }
}
