/* eslint-disable semi */
'use strict';

import { expect } from 'chai';
import sinon from 'sinon';
import proxyquire from 'proxyquire';

const requestSpy = sinon.spy();
const makeRequest = proxyquire('../util/utils', {'request': requestSpy});
const NatGeo = proxyquire('./api', {'../util/utils': makeRequest});

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
      const result = NatGeo.API.getLatestNews();

      expect(typeof result.then).to.be.equal('function');
      expect(typeof result.catch).to.be.equal('function');
      sinon.assert.calledWith(requestSpy, correctPayloadGivenNoValidInput);
    });

    it('returns promise given one invalid parameter and proper request payload created', () => {
      const result = NatGeo.API.getLatestNews(TEST_TEXT);

      expect(typeof result.then).to.be.equal('function');
      expect(typeof result.catch).to.be.equal('function');
      sinon.assert.calledWith(requestSpy, correctPayloadGivenNoValidInput);
    });

    it('returns promise given invalid parameters and proper request payload created', () => {
      const result = NatGeo.API.getLatestNews(TEST_TEXT, TEST_TEXT);

      expect(typeof result.then).to.be.equal('function');
      expect(typeof result.catch).to.be.equal('function');
      sinon.assert.calledWith(requestSpy, correctPayloadGivenNoValidInput);
    });

    it('returns promise given one valid parameter and proper request payload created', () => {
      const correctPayload = {
        method: 'GET',
        url: `http://www.nationalgeographic.com/bin/services/core/public/query/content.json?contentTypes=adventure/components/pagetypes/story/article,adventure/components/pagetypes/story/gallery,adventure/components/pagetypes/story/interactive,adventure/components/pagetypes/story/multipage,animals/components/pagetypes/story/article,animals/components/pagetypes/story/gallery,animals/components/pagetypes/story/interactive,animals/components/pagetypes/story/multipage,archaeologyandhistory/components/pagetypes/story/article,archaeologyandhistory/components/pagetypes/story/gallery,archaeologyandhistory/components/pagetypes/story/interactive,archaeologyandhistory/components/pagetypes/story/multipage,environment/components/pagetypes/story/article,environment/components/pagetypes/story/gallery,environment/components/pagetypes/story/interactive,environment/components/pagetypes/story/multipage,magazine/components/pagetypes/story/article,magazine/components/pagetypes/story/gallery,magazine/components/pagetypes/story/interactive,magazine/components/pagetypes/story/multipage,news/components/pagetypes/story/article,news/components/pagetypes/story/gallery,news/components/pagetypes/story/interactive,news/components/pagetypes/story/multipage,parks/components/pagetypes/story/article,parks/components/pagetypes/story/gallery,parks/components/pagetypes/story/interactive,parks/components/pagetypes/story/multipage,peopleandculture/components/pagetypes/story/article,peopleandculture/components/pagetypes/story/gallery,peopleandculture/components/pagetypes/story/interactive,peopleandculture/components/pagetypes/story/multipage,photography/components/pagetypes/story/article,photography/components/pagetypes/story/gallery,photography/components/pagetypes/story/interactive,photography/components/pagetypes/story/multipage,science/components/pagetypes/story/article,science/components/pagetypes/story/gallery,science/components/pagetypes/story/interactive,science/components/pagetypes/story/multipage,travel/components/pagetypes/story/article,travel/components/pagetypes/story/gallery,travel/components/pagetypes/story/interactive,travel/components/pagetypes/story/multipage&sort=newest&operator=or&includedTags=&excludedTags=ngs_genres:reference,ngs_visibility:omit_from_hp&excludedGuids=beda7baa-e63b-4276-8122-34e47a4e653e&pageSize=${TEST_PAGE_SIZE}&page=0`
      };

      const result = NatGeo.API.getLatestNews(TEST_PAGE_SIZE, TEST_TEXT);

      expect(typeof result.then).to.be.equal('function');
      expect(typeof result.catch).to.be.equal('function');
      sinon.assert.calledWith(requestSpy, correctPayload);
    });

    it('returns promise given both valid parameter and proper request payload created', () => {
      const correctPayload = {
        method: 'GET',
        url: `http://www.nationalgeographic.com/bin/services/core/public/query/content.json?contentTypes=adventure/components/pagetypes/story/article,adventure/components/pagetypes/story/gallery,adventure/components/pagetypes/story/interactive,adventure/components/pagetypes/story/multipage,animals/components/pagetypes/story/article,animals/components/pagetypes/story/gallery,animals/components/pagetypes/story/interactive,animals/components/pagetypes/story/multipage,archaeologyandhistory/components/pagetypes/story/article,archaeologyandhistory/components/pagetypes/story/gallery,archaeologyandhistory/components/pagetypes/story/interactive,archaeologyandhistory/components/pagetypes/story/multipage,environment/components/pagetypes/story/article,environment/components/pagetypes/story/gallery,environment/components/pagetypes/story/interactive,environment/components/pagetypes/story/multipage,magazine/components/pagetypes/story/article,magazine/components/pagetypes/story/gallery,magazine/components/pagetypes/story/interactive,magazine/components/pagetypes/story/multipage,news/components/pagetypes/story/article,news/components/pagetypes/story/gallery,news/components/pagetypes/story/interactive,news/components/pagetypes/story/multipage,parks/components/pagetypes/story/article,parks/components/pagetypes/story/gallery,parks/components/pagetypes/story/interactive,parks/components/pagetypes/story/multipage,peopleandculture/components/pagetypes/story/article,peopleandculture/components/pagetypes/story/gallery,peopleandculture/components/pagetypes/story/interactive,peopleandculture/components/pagetypes/story/multipage,photography/components/pagetypes/story/article,photography/components/pagetypes/story/gallery,photography/components/pagetypes/story/interactive,photography/components/pagetypes/story/multipage,science/components/pagetypes/story/article,science/components/pagetypes/story/gallery,science/components/pagetypes/story/interactive,science/components/pagetypes/story/multipage,travel/components/pagetypes/story/article,travel/components/pagetypes/story/gallery,travel/components/pagetypes/story/interactive,travel/components/pagetypes/story/multipage&sort=newest&operator=or&includedTags=&excludedTags=ngs_genres:reference,ngs_visibility:omit_from_hp&excludedGuids=beda7baa-e63b-4276-8122-34e47a4e653e&pageSize=${TEST_PAGE_SIZE}&page=${TEST_PAGE_NUMBER}`
      };

      const result = NatGeo.API.getLatestNews(TEST_PAGE_SIZE, TEST_PAGE_NUMBER);

      expect(typeof result.then).to.be.equal('function');
      expect(typeof result.catch).to.be.equal('function');
      sinon.assert.calledWith(requestSpy, correctPayload);
    });

    it('given cb no promise/parameters returned and expected request payload created', () => {
      const result = NatGeo.API.getLatestNews(TEST_CALLBACK);

      expect(result).to.equal(undefined);
      sinon.assert.calledWith(requestSpy, correctPayloadGivenNoValidInput);
    });

    it('given cb and one invalid parameter no promise returned and proper request payload created', () => {
      const result = NatGeo.API.getLatestNews(TEST_TEXT, TEST_CALLBACK);

      expect(result).to.equal(undefined);
      sinon.assert.calledWith(requestSpy, correctPayloadGivenNoValidInput);
    });

    it('given cb and invalid parameters no promise returned and proper request payload created', () => {
      const result = NatGeo.API.getLatestNews(TEST_TEXT, TEST_TEXT, TEST_CALLBACK);

      expect(result).to.equal(undefined);
      sinon.assert.calledWith(requestSpy, correctPayloadGivenNoValidInput);
    });

    it('given cb and one valid parameter no promise returned and proper request payload created', () => {
      const correctPayload = {
        method: 'GET',
        url: `http://www.nationalgeographic.com/bin/services/core/public/query/content.json?contentTypes=adventure/components/pagetypes/story/article,adventure/components/pagetypes/story/gallery,adventure/components/pagetypes/story/interactive,adventure/components/pagetypes/story/multipage,animals/components/pagetypes/story/article,animals/components/pagetypes/story/gallery,animals/components/pagetypes/story/interactive,animals/components/pagetypes/story/multipage,archaeologyandhistory/components/pagetypes/story/article,archaeologyandhistory/components/pagetypes/story/gallery,archaeologyandhistory/components/pagetypes/story/interactive,archaeologyandhistory/components/pagetypes/story/multipage,environment/components/pagetypes/story/article,environment/components/pagetypes/story/gallery,environment/components/pagetypes/story/interactive,environment/components/pagetypes/story/multipage,magazine/components/pagetypes/story/article,magazine/components/pagetypes/story/gallery,magazine/components/pagetypes/story/interactive,magazine/components/pagetypes/story/multipage,news/components/pagetypes/story/article,news/components/pagetypes/story/gallery,news/components/pagetypes/story/interactive,news/components/pagetypes/story/multipage,parks/components/pagetypes/story/article,parks/components/pagetypes/story/gallery,parks/components/pagetypes/story/interactive,parks/components/pagetypes/story/multipage,peopleandculture/components/pagetypes/story/article,peopleandculture/components/pagetypes/story/gallery,peopleandculture/components/pagetypes/story/interactive,peopleandculture/components/pagetypes/story/multipage,photography/components/pagetypes/story/article,photography/components/pagetypes/story/gallery,photography/components/pagetypes/story/interactive,photography/components/pagetypes/story/multipage,science/components/pagetypes/story/article,science/components/pagetypes/story/gallery,science/components/pagetypes/story/interactive,science/components/pagetypes/story/multipage,travel/components/pagetypes/story/article,travel/components/pagetypes/story/gallery,travel/components/pagetypes/story/interactive,travel/components/pagetypes/story/multipage&sort=newest&operator=or&includedTags=&excludedTags=ngs_genres:reference,ngs_visibility:omit_from_hp&excludedGuids=beda7baa-e63b-4276-8122-34e47a4e653e&pageSize=${TEST_PAGE_SIZE}&page=0`
      };

      const result = NatGeo.API.getLatestNews(TEST_PAGE_SIZE, TEST_TEXT, TEST_CALLBACK);
      expect(result).to.equal(undefined);
      sinon.assert.calledWith(requestSpy, correctPayload);
    });

    it('given cb and both valid parameter no promise returned and proper request payload created', () => {
      const correctPayload = {
        method: 'GET',
        url: `http://www.nationalgeographic.com/bin/services/core/public/query/content.json?contentTypes=adventure/components/pagetypes/story/article,adventure/components/pagetypes/story/gallery,adventure/components/pagetypes/story/interactive,adventure/components/pagetypes/story/multipage,animals/components/pagetypes/story/article,animals/components/pagetypes/story/gallery,animals/components/pagetypes/story/interactive,animals/components/pagetypes/story/multipage,archaeologyandhistory/components/pagetypes/story/article,archaeologyandhistory/components/pagetypes/story/gallery,archaeologyandhistory/components/pagetypes/story/interactive,archaeologyandhistory/components/pagetypes/story/multipage,environment/components/pagetypes/story/article,environment/components/pagetypes/story/gallery,environment/components/pagetypes/story/interactive,environment/components/pagetypes/story/multipage,magazine/components/pagetypes/story/article,magazine/components/pagetypes/story/gallery,magazine/components/pagetypes/story/interactive,magazine/components/pagetypes/story/multipage,news/components/pagetypes/story/article,news/components/pagetypes/story/gallery,news/components/pagetypes/story/interactive,news/components/pagetypes/story/multipage,parks/components/pagetypes/story/article,parks/components/pagetypes/story/gallery,parks/components/pagetypes/story/interactive,parks/components/pagetypes/story/multipage,peopleandculture/components/pagetypes/story/article,peopleandculture/components/pagetypes/story/gallery,peopleandculture/components/pagetypes/story/interactive,peopleandculture/components/pagetypes/story/multipage,photography/components/pagetypes/story/article,photography/components/pagetypes/story/gallery,photography/components/pagetypes/story/interactive,photography/components/pagetypes/story/multipage,science/components/pagetypes/story/article,science/components/pagetypes/story/gallery,science/components/pagetypes/story/interactive,science/components/pagetypes/story/multipage,travel/components/pagetypes/story/article,travel/components/pagetypes/story/gallery,travel/components/pagetypes/story/interactive,travel/components/pagetypes/story/multipage&sort=newest&operator=or&includedTags=&excludedTags=ngs_genres:reference,ngs_visibility:omit_from_hp&excludedGuids=beda7baa-e63b-4276-8122-34e47a4e653e&pageSize=${TEST_PAGE_SIZE}&page=${TEST_PAGE_NUMBER}`
      };

      const result = NatGeo.API.getLatestNews(TEST_PAGE_SIZE, TEST_PAGE_NUMBER, TEST_CALLBACK);
      expect(result).to.equal(undefined);
      sinon.assert.calledWith(requestSpy, correctPayload);
    });
  });
});
