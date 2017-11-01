/* eslint-disable semi */
'use strict';

import { makeRequest } from '../util/utils';
/* eslint-disable no-unused-vars */
import {register} from 'babel-core';
import * as babel from 'babel-polyfill';
/* eslint-enable no-unused-vars */

const LN_API_URL = 'http://www.nationalgeographic.com/bin/services/core/public/query/content.json?contentTypes=adventure/components/pagetypes/story/article,adventure/components/pagetypes/story/gallery,adventure/components/pagetypes/story/interactive,adventure/components/pagetypes/story/multipage,animals/components/pagetypes/story/article,animals/components/pagetypes/story/gallery,animals/components/pagetypes/story/interactive,animals/components/pagetypes/story/multipage,archaeologyandhistory/components/pagetypes/story/article,archaeologyandhistory/components/pagetypes/story/gallery,archaeologyandhistory/components/pagetypes/story/interactive,archaeologyandhistory/components/pagetypes/story/multipage,environment/components/pagetypes/story/article,environment/components/pagetypes/story/gallery,environment/components/pagetypes/story/interactive,environment/components/pagetypes/story/multipage,magazine/components/pagetypes/story/article,magazine/components/pagetypes/story/gallery,magazine/components/pagetypes/story/interactive,magazine/components/pagetypes/story/multipage,news/components/pagetypes/story/article,news/components/pagetypes/story/gallery,news/components/pagetypes/story/interactive,news/components/pagetypes/story/multipage,parks/components/pagetypes/story/article,parks/components/pagetypes/story/gallery,parks/components/pagetypes/story/interactive,parks/components/pagetypes/story/multipage,peopleandculture/components/pagetypes/story/article,peopleandculture/components/pagetypes/story/gallery,peopleandculture/components/pagetypes/story/interactive,peopleandculture/components/pagetypes/story/multipage,photography/components/pagetypes/story/article,photography/components/pagetypes/story/gallery,photography/components/pagetypes/story/interactive,photography/components/pagetypes/story/multipage,science/components/pagetypes/story/article,science/components/pagetypes/story/gallery,science/components/pagetypes/story/interactive,science/components/pagetypes/story/multipage,travel/components/pagetypes/story/article,travel/components/pagetypes/story/gallery,travel/components/pagetypes/story/interactive,travel/components/pagetypes/story/multipage&sort=newest&operator=or&includedTags=&excludedTags=ngs_genres:reference,ngs_visibility:omit_from_hp&excludedGuids=beda7baa-e63b-4276-8122-34e47a4e653e';
const DEFAULT_PAGE_SIZE = 3;

const POD_API_URL = 'https://relay.nationalgeographic.com/proxy/distribution/feed/v1?format=jsonapi&content_type=featured_image&fields=image,uri&collection=fd5444cc-4777-4438-b9d4-5085c0564b44';
const NATGEO_API_USER = 'pod_archive';
const NATGEO_API_KEY = '9fa5d22ad7b354fe0f9be5597bcf153df56e2ca5';
const timeInOneDay = 1000 * 60 * 60 * 24;

const requestOptions = {
  url: undefined,
  method: 'GET',
  headers: {
    'apiauth-apiuser': NATGEO_API_USER,
    'apiauth-apikey': NATGEO_API_KEY
  }
};

const getRequestOptions = function getRequestOptions (url) {
  const options = JSON.parse(JSON.stringify(requestOptions));
  options.url = url;
  return options;
};

const getYesterdayPhoto = function getYesterdayPhoto (callback) {
  const yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const yesterdayString = yesterdayDate.toISOString();
  const day = yesterdayString.substring(0, yesterdayString.indexOf('T'));
  const url = `${POD_API_URL}&publication_datetime__from=${day}T00:00:00Z&page=1&limit=1`;
  const requestOptions = getRequestOptions(url);

  return makeRequest(requestOptions, callback);
};

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

  static async getPhotoOfDay (day, cb) {
    let url, callback;

    if (arguments.length === 2) {
      callback = cb;
    } else if (arguments.length === 1) {
      if (Object.prototype.toString.call(arguments[0]) === '[object Function]') {
        callback = day;
      }
    }

    if (Object.prototype.toString.call(day) !== '[object String]' || isNaN(Date.parse(day))) {
      const now = new Date().toISOString();
      const date = now.substring(0, now.indexOf('T'));
      url = `${POD_API_URL}&publication_datetime__from=${date}T00:00:00Z&page=1&limit=1`;
    } else {
      const targetDate = new Date(day);
      const numberOfDays = Math.floor(Math.abs((Date.now() - targetDate.getTime()) / (timeInOneDay)));
      url = `${POD_API_URL}&publication_datetime__from=${day}T00:00:00Z&page=${numberOfDays}&limit=1`;
    }

    const requestOptions = getRequestOptions(url);

    const result = await makeRequest(requestOptions);
    const payload = JSON.parse(result);

    if (payload.data.length > 0) {
      if (typeof callback === 'function') {
        callback(result);
      } else {
        return result;
      }
    } else {
      return getYesterdayPhoto(callback);
    }
  }
}
