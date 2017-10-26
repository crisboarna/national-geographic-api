/* eslint-disable semi */
'use strict';

import { expect } from 'chai';
import sinon from 'sinon';
import proxyquire from 'proxyquire';

const requestSpy = sinon.spy();
const makeRequest = proxyquire('../util/utils', {'request': requestSpy});
const NatGeo = proxyquire('./api', {'../util/utils': makeRequest}).API;
const timeInOneDay = 1000 * 60 * 60 * 24;

describe('NationalGeographic API', () => {
  const TEST_TEXT = 'TEST_TEXT';
  const TEST_CALLBACK = () => {
  };

  beforeEach(() => {
    requestSpy.reset();
  });

  describe('getLatestNews', () => {
    const TEST_PAGE_SIZE = 1234;
    const TEST_PAGE_NUMBER = 9876;
    const correctPayloadGivenNoValidInput = {
      method: 'GET',
      url: 'http://www.nationalgeographic.com/bin/services/core/public/query/content.json?contentTypes=adventure/components/pagetypes/story/article,adventure/components/pagetypes/story/gallery,adventure/components/pagetypes/story/interactive,adventure/components/pagetypes/story/multipage,animals/components/pagetypes/story/article,animals/components/pagetypes/story/gallery,animals/components/pagetypes/story/interactive,animals/components/pagetypes/story/multipage,archaeologyandhistory/components/pagetypes/story/article,archaeologyandhistory/components/pagetypes/story/gallery,archaeologyandhistory/components/pagetypes/story/interactive,archaeologyandhistory/components/pagetypes/story/multipage,environment/components/pagetypes/story/article,environment/components/pagetypes/story/gallery,environment/components/pagetypes/story/interactive,environment/components/pagetypes/story/multipage,magazine/components/pagetypes/story/article,magazine/components/pagetypes/story/gallery,magazine/components/pagetypes/story/interactive,magazine/components/pagetypes/story/multipage,news/components/pagetypes/story/article,news/components/pagetypes/story/gallery,news/components/pagetypes/story/interactive,news/components/pagetypes/story/multipage,parks/components/pagetypes/story/article,parks/components/pagetypes/story/gallery,parks/components/pagetypes/story/interactive,parks/components/pagetypes/story/multipage,peopleandculture/components/pagetypes/story/article,peopleandculture/components/pagetypes/story/gallery,peopleandculture/components/pagetypes/story/interactive,peopleandculture/components/pagetypes/story/multipage,photography/components/pagetypes/story/article,photography/components/pagetypes/story/gallery,photography/components/pagetypes/story/interactive,photography/components/pagetypes/story/multipage,science/components/pagetypes/story/article,science/components/pagetypes/story/gallery,science/components/pagetypes/story/interactive,science/components/pagetypes/story/multipage,travel/components/pagetypes/story/article,travel/components/pagetypes/story/gallery,travel/components/pagetypes/story/interactive,travel/components/pagetypes/story/multipage&sort=newest&operator=or&includedTags=&excludedTags=ngs_genres:reference,ngs_visibility:omit_from_hp&excludedGuids=beda7baa-e63b-4276-8122-34e47a4e653e&pageSize=3&page=0'
    };

    it('returns a promise given no cb and correct request payload created', () => {
      const result = NatGeo.getLatestNews();

      expect(typeof result.then).to.be.equal('function');
      expect(typeof result.catch).to.be.equal('function');
      sinon.assert.calledWith(requestSpy, correctPayloadGivenNoValidInput);
    });

    it('returns promise given one invalid parameter and proper request payload created', () => {
      const result = NatGeo.getLatestNews(TEST_TEXT);

      expect(typeof result.then).to.be.equal('function');
      expect(typeof result.catch).to.be.equal('function');
      sinon.assert.calledWith(requestSpy, correctPayloadGivenNoValidInput);
    });

    it('returns promise given invalid parameters and proper request payload created', () => {
      const result = NatGeo.getLatestNews(TEST_TEXT, TEST_TEXT);

      expect(typeof result.then).to.be.equal('function');
      expect(typeof result.catch).to.be.equal('function');
      sinon.assert.calledWith(requestSpy, correctPayloadGivenNoValidInput);
    });

    it('returns promise given one valid parameter and proper request payload created', () => {
      const correctPayload = {
        method: 'GET',
        url: `http://www.nationalgeographic.com/bin/services/core/public/query/content.json?contentTypes=adventure/components/pagetypes/story/article,adventure/components/pagetypes/story/gallery,adventure/components/pagetypes/story/interactive,adventure/components/pagetypes/story/multipage,animals/components/pagetypes/story/article,animals/components/pagetypes/story/gallery,animals/components/pagetypes/story/interactive,animals/components/pagetypes/story/multipage,archaeologyandhistory/components/pagetypes/story/article,archaeologyandhistory/components/pagetypes/story/gallery,archaeologyandhistory/components/pagetypes/story/interactive,archaeologyandhistory/components/pagetypes/story/multipage,environment/components/pagetypes/story/article,environment/components/pagetypes/story/gallery,environment/components/pagetypes/story/interactive,environment/components/pagetypes/story/multipage,magazine/components/pagetypes/story/article,magazine/components/pagetypes/story/gallery,magazine/components/pagetypes/story/interactive,magazine/components/pagetypes/story/multipage,news/components/pagetypes/story/article,news/components/pagetypes/story/gallery,news/components/pagetypes/story/interactive,news/components/pagetypes/story/multipage,parks/components/pagetypes/story/article,parks/components/pagetypes/story/gallery,parks/components/pagetypes/story/interactive,parks/components/pagetypes/story/multipage,peopleandculture/components/pagetypes/story/article,peopleandculture/components/pagetypes/story/gallery,peopleandculture/components/pagetypes/story/interactive,peopleandculture/components/pagetypes/story/multipage,photography/components/pagetypes/story/article,photography/components/pagetypes/story/gallery,photography/components/pagetypes/story/interactive,photography/components/pagetypes/story/multipage,science/components/pagetypes/story/article,science/components/pagetypes/story/gallery,science/components/pagetypes/story/interactive,science/components/pagetypes/story/multipage,travel/components/pagetypes/story/article,travel/components/pagetypes/story/gallery,travel/components/pagetypes/story/interactive,travel/components/pagetypes/story/multipage&sort=newest&operator=or&includedTags=&excludedTags=ngs_genres:reference,ngs_visibility:omit_from_hp&excludedGuids=beda7baa-e63b-4276-8122-34e47a4e653e&pageSize=${TEST_PAGE_SIZE}&page=0`
      };

      const result = NatGeo.getLatestNews(TEST_PAGE_SIZE, TEST_TEXT);

      expect(typeof result.then).to.be.equal('function');
      expect(typeof result.catch).to.be.equal('function');
      sinon.assert.calledWith(requestSpy, correctPayload);
    });

    it('returns promise given both valid parameter and proper request payload created', () => {
      const correctPayload = {
        method: 'GET',
        url: `http://www.nationalgeographic.com/bin/services/core/public/query/content.json?contentTypes=adventure/components/pagetypes/story/article,adventure/components/pagetypes/story/gallery,adventure/components/pagetypes/story/interactive,adventure/components/pagetypes/story/multipage,animals/components/pagetypes/story/article,animals/components/pagetypes/story/gallery,animals/components/pagetypes/story/interactive,animals/components/pagetypes/story/multipage,archaeologyandhistory/components/pagetypes/story/article,archaeologyandhistory/components/pagetypes/story/gallery,archaeologyandhistory/components/pagetypes/story/interactive,archaeologyandhistory/components/pagetypes/story/multipage,environment/components/pagetypes/story/article,environment/components/pagetypes/story/gallery,environment/components/pagetypes/story/interactive,environment/components/pagetypes/story/multipage,magazine/components/pagetypes/story/article,magazine/components/pagetypes/story/gallery,magazine/components/pagetypes/story/interactive,magazine/components/pagetypes/story/multipage,news/components/pagetypes/story/article,news/components/pagetypes/story/gallery,news/components/pagetypes/story/interactive,news/components/pagetypes/story/multipage,parks/components/pagetypes/story/article,parks/components/pagetypes/story/gallery,parks/components/pagetypes/story/interactive,parks/components/pagetypes/story/multipage,peopleandculture/components/pagetypes/story/article,peopleandculture/components/pagetypes/story/gallery,peopleandculture/components/pagetypes/story/interactive,peopleandculture/components/pagetypes/story/multipage,photography/components/pagetypes/story/article,photography/components/pagetypes/story/gallery,photography/components/pagetypes/story/interactive,photography/components/pagetypes/story/multipage,science/components/pagetypes/story/article,science/components/pagetypes/story/gallery,science/components/pagetypes/story/interactive,science/components/pagetypes/story/multipage,travel/components/pagetypes/story/article,travel/components/pagetypes/story/gallery,travel/components/pagetypes/story/interactive,travel/components/pagetypes/story/multipage&sort=newest&operator=or&includedTags=&excludedTags=ngs_genres:reference,ngs_visibility:omit_from_hp&excludedGuids=beda7baa-e63b-4276-8122-34e47a4e653e&pageSize=${TEST_PAGE_SIZE}&page=${TEST_PAGE_NUMBER}`
      };

      const result = NatGeo.getLatestNews(TEST_PAGE_SIZE, TEST_PAGE_NUMBER);

      expect(typeof result.then).to.be.equal('function');
      expect(typeof result.catch).to.be.equal('function');
      sinon.assert.calledWith(requestSpy, correctPayload);
    });

    it('given cb no promise/parameters returned and expected request payload created', () => {
      const result = NatGeo.getLatestNews(TEST_CALLBACK);

      expect(result).to.equal(undefined);
      sinon.assert.calledWith(requestSpy, correctPayloadGivenNoValidInput);
    });

    it('given cb and one invalid parameter no promise returned and proper request payload created', () => {
      const result = NatGeo.getLatestNews(TEST_TEXT, TEST_CALLBACK);

      expect(result).to.equal(undefined);
      sinon.assert.calledWith(requestSpy, correctPayloadGivenNoValidInput);
    });

    it('given cb and invalid parameters no promise returned and proper request payload created', () => {
      const result = NatGeo.getLatestNews(TEST_TEXT, TEST_TEXT, TEST_CALLBACK);

      expect(result).to.equal(undefined);
      sinon.assert.calledWith(requestSpy, correctPayloadGivenNoValidInput);
    });

    it('given cb and one valid parameter no promise returned and proper request payload created', () => {
      const correctPayload = {
        method: 'GET',
        url: `http://www.nationalgeographic.com/bin/services/core/public/query/content.json?contentTypes=adventure/components/pagetypes/story/article,adventure/components/pagetypes/story/gallery,adventure/components/pagetypes/story/interactive,adventure/components/pagetypes/story/multipage,animals/components/pagetypes/story/article,animals/components/pagetypes/story/gallery,animals/components/pagetypes/story/interactive,animals/components/pagetypes/story/multipage,archaeologyandhistory/components/pagetypes/story/article,archaeologyandhistory/components/pagetypes/story/gallery,archaeologyandhistory/components/pagetypes/story/interactive,archaeologyandhistory/components/pagetypes/story/multipage,environment/components/pagetypes/story/article,environment/components/pagetypes/story/gallery,environment/components/pagetypes/story/interactive,environment/components/pagetypes/story/multipage,magazine/components/pagetypes/story/article,magazine/components/pagetypes/story/gallery,magazine/components/pagetypes/story/interactive,magazine/components/pagetypes/story/multipage,news/components/pagetypes/story/article,news/components/pagetypes/story/gallery,news/components/pagetypes/story/interactive,news/components/pagetypes/story/multipage,parks/components/pagetypes/story/article,parks/components/pagetypes/story/gallery,parks/components/pagetypes/story/interactive,parks/components/pagetypes/story/multipage,peopleandculture/components/pagetypes/story/article,peopleandculture/components/pagetypes/story/gallery,peopleandculture/components/pagetypes/story/interactive,peopleandculture/components/pagetypes/story/multipage,photography/components/pagetypes/story/article,photography/components/pagetypes/story/gallery,photography/components/pagetypes/story/interactive,photography/components/pagetypes/story/multipage,science/components/pagetypes/story/article,science/components/pagetypes/story/gallery,science/components/pagetypes/story/interactive,science/components/pagetypes/story/multipage,travel/components/pagetypes/story/article,travel/components/pagetypes/story/gallery,travel/components/pagetypes/story/interactive,travel/components/pagetypes/story/multipage&sort=newest&operator=or&includedTags=&excludedTags=ngs_genres:reference,ngs_visibility:omit_from_hp&excludedGuids=beda7baa-e63b-4276-8122-34e47a4e653e&pageSize=${TEST_PAGE_SIZE}&page=0`
      };

      const result = NatGeo.getLatestNews(TEST_PAGE_SIZE, TEST_TEXT, TEST_CALLBACK);
      expect(result).to.equal(undefined);
      sinon.assert.calledWith(requestSpy, correctPayload);
    });

    it('given cb and both valid parameter no promise returned and proper request payload created', () => {
      const correctPayload = {
        method: 'GET',
        url: `http://www.nationalgeographic.com/bin/services/core/public/query/content.json?contentTypes=adventure/components/pagetypes/story/article,adventure/components/pagetypes/story/gallery,adventure/components/pagetypes/story/interactive,adventure/components/pagetypes/story/multipage,animals/components/pagetypes/story/article,animals/components/pagetypes/story/gallery,animals/components/pagetypes/story/interactive,animals/components/pagetypes/story/multipage,archaeologyandhistory/components/pagetypes/story/article,archaeologyandhistory/components/pagetypes/story/gallery,archaeologyandhistory/components/pagetypes/story/interactive,archaeologyandhistory/components/pagetypes/story/multipage,environment/components/pagetypes/story/article,environment/components/pagetypes/story/gallery,environment/components/pagetypes/story/interactive,environment/components/pagetypes/story/multipage,magazine/components/pagetypes/story/article,magazine/components/pagetypes/story/gallery,magazine/components/pagetypes/story/interactive,magazine/components/pagetypes/story/multipage,news/components/pagetypes/story/article,news/components/pagetypes/story/gallery,news/components/pagetypes/story/interactive,news/components/pagetypes/story/multipage,parks/components/pagetypes/story/article,parks/components/pagetypes/story/gallery,parks/components/pagetypes/story/interactive,parks/components/pagetypes/story/multipage,peopleandculture/components/pagetypes/story/article,peopleandculture/components/pagetypes/story/gallery,peopleandculture/components/pagetypes/story/interactive,peopleandculture/components/pagetypes/story/multipage,photography/components/pagetypes/story/article,photography/components/pagetypes/story/gallery,photography/components/pagetypes/story/interactive,photography/components/pagetypes/story/multipage,science/components/pagetypes/story/article,science/components/pagetypes/story/gallery,science/components/pagetypes/story/interactive,science/components/pagetypes/story/multipage,travel/components/pagetypes/story/article,travel/components/pagetypes/story/gallery,travel/components/pagetypes/story/interactive,travel/components/pagetypes/story/multipage&sort=newest&operator=or&includedTags=&excludedTags=ngs_genres:reference,ngs_visibility:omit_from_hp&excludedGuids=beda7baa-e63b-4276-8122-34e47a4e653e&pageSize=${TEST_PAGE_SIZE}&page=${TEST_PAGE_NUMBER}`
      };

      const result = NatGeo.getLatestNews(TEST_PAGE_SIZE, TEST_PAGE_NUMBER, TEST_CALLBACK);
      expect(result).to.equal(undefined);
      sinon.assert.calledWith(requestSpy, correctPayload);
    });
  });

  describe('getPhotoOfDay', () => {
    const POD_API_URL = 'https://relay.nationalgeographic.com/proxy/distribution/feed/v1?format=jsonapi&content_type=featured_image&fields=image,uri&collection=fd5444cc-4777-4438-b9d4-5085c0564b44';
    const TEST_DAY = '2017-10-21';
    const now = new Date().toISOString();
    const TEST_DAY_DEFAULT = now.substring(0, now.indexOf('T'));
    const correctDefaultPayload = {
      headers: {
        'apiauth-apikey': '9fa5d22ad7b354fe0f9be5597bcf153df56e2ca5',
        'apiauth-apiuser': 'pod_archive'
      },
      method: 'GET',
      url: `https://relay.nationalgeographic.com/proxy/distribution/feed/v1?format=jsonapi&content_type=featured_image&fields=image,uri&collection=fd5444cc-4777-4438-b9d4-5085c0564b44&publication_datetime_from=${TEST_DAY_DEFAULT}T00:00:00Z&page=1&limit=1`
    };

    it('returns a promise and expected payload given no cb', () => {
      const result = NatGeo.getPhotoOfDay();

      expect(typeof result.then).to.be.equal('function');
      expect(typeof result.catch).to.be.equal('function');
      sinon.assert.calledWith(requestSpy, correctDefaultPayload);
    });

    it('returns a promise given no cb and wrong input and expected request payload created', () => {
      const result = NatGeo.getPhotoOfDay(TEST_TEXT);

      expect(typeof result.then).to.be.equal('function');
      expect(typeof result.catch).to.be.equal('function');
      sinon.assert.calledWith(requestSpy, correctDefaultPayload);
    });

    it('returns a promise given no cb and correct input and expected request payload created', () => {
      const POD_API_URL = 'https://relay.nationalgeographic.com/proxy/distribution/feed/v1?format=jsonapi&content_type=featured_image&fields=image,uri&collection=fd5444cc-4777-4438-b9d4-5085c0564b44';

      const targetDate = new Date(TEST_DAY);
      const numberOfDays = Math.round(Math.abs((Date.now() - targetDate.getTime()) / (timeInOneDay)));
      const url = `${POD_API_URL}&publication_datetime_from=${TEST_DAY}T00:00:00Z&page=${numberOfDays}&limit=1`;
      const correctInputPayload = {
        headers: {
          'apiauth-apikey': '9fa5d22ad7b354fe0f9be5597bcf153df56e2ca5',
          'apiauth-apiuser': 'pod_archive'
        },
        method: 'GET',
        url: url
      };

      const result = NatGeo.getPhotoOfDay(TEST_DAY);

      expect(typeof result.then).to.be.equal('function');
      expect(typeof result.catch).to.be.equal('function');
      sinon.assert.calledWith(requestSpy, correctInputPayload);
    });

    it('given cb no promise/parameters returned and expected request payload created', () => {
      const result = NatGeo.getPhotoOfDay(TEST_CALLBACK);

      expect(result).to.equal(undefined);
      sinon.assert.calledWith(requestSpy, correctDefaultPayload);
    });

    it('given cb and invalid parameter no promise returned and expected request payload created', () => {
      const result = NatGeo.getPhotoOfDay(TEST_TEXT, TEST_CALLBACK);

      expect(result).to.equal(undefined);
      sinon.assert.calledWith(requestSpy, correctDefaultPayload);
    });

    it('given cb and valid parameter no promise returned and expected request payload created', () => {
      const targetDate = new Date(TEST_DAY);
      const numberOfDays = Math.round(Math.abs((Date.now() - targetDate.getTime()) / (timeInOneDay)));
      const url = `${POD_API_URL}&publication_datetime_from=${TEST_DAY}T00:00:00Z&page=${numberOfDays}&limit=1`;
      const correctInputPayload = {
        headers: {
          'apiauth-apikey': '9fa5d22ad7b354fe0f9be5597bcf153df56e2ca5',
          'apiauth-apiuser': 'pod_archive'
        },
        method: 'GET',
        url: url
      };

      const result = NatGeo.getPhotoOfDay(TEST_DAY, TEST_CALLBACK);

      expect(result).to.equal(undefined);
      sinon.assert.calledWith(requestSpy, correctInputPayload);
    });
  });
});
