/* eslint-disable semi */
'use strict';
import { expect } from 'chai';
import sinon from 'sinon';
import proxyquire from 'proxyquire';

describe('makeRequest', () => {
  const options = {};
  const TEST_ERROR = 'TEST_ERROR';
  const TEST_BODY = {success: 'SUCCESS_TEST'};
  const TEST_REQUEST = {};

  describe('callbacks', () => {
    const callbackSpy = sinon.spy();

    beforeEach(() => {
      callbackSpy.reset();
    });

    it('calls cb with error given error', () => {
      const request = (req, cb) => cb(TEST_ERROR);
      const utils = proxyquire('./utils', {'request': request});

      const result = utils.makeRequest(options, callbackSpy);

      expect(typeof result).to.equal('undefined');
      sinon.assert.calledOnce(callbackSpy);
      sinon.assert.calledWith(callbackSpy, TEST_ERROR);
    });

    it('calls cb with body error given no error and body with error', () => {
      const request = (req, cb) => cb(null, TEST_REQUEST, {error: TEST_ERROR});
      const utils = proxyquire('./utils', {'request': request});

      const result = utils.makeRequest(options, callbackSpy);

      expect(typeof result).to.equal('undefined');
      sinon.assert.calledOnce(callbackSpy);
      sinon.assert.calledWith(callbackSpy, TEST_ERROR);
    });

    it('calls cb with body error given no error and body', () => {
      const request = (req, cb) => cb(null, TEST_REQUEST, TEST_BODY);
      const utils = proxyquire('./utils', {'request': request});

      const result = utils.makeRequest(options, callbackSpy);

      expect(typeof result).to.equal('undefined');
      sinon.assert.calledOnce(callbackSpy);
      sinon.assert.calledWith(callbackSpy, null, TEST_BODY);
    });
  });

  describe('promises', () => {
    it('rejected promise given error', (done) => {
      const request = (req, cb) => cb(TEST_ERROR);
      const utils = proxyquire('./utils', {'request': request});

      const result = utils.makeRequest(options);

      expect(typeof result.then).to.be.equal('function');
      expect(typeof result.catch).to.be.equal('function');
      result.catch((err) => {
        expect(err).to.be.equal(TEST_ERROR);
        done();
      });
    });

    it('resolves body constructor object', (done) => {
      const request = (req, cb) => cb(null, TEST_REQUEST, TEST_BODY);
      const utils = proxyquire('./utils', {'request': request});

      const result = utils.makeRequest(options);

      expect(typeof result.then).to.be.equal('function');
      expect(typeof result.catch).to.be.equal('function');
      result.then((res) => {
        expect(res).to.be.equal(TEST_BODY);
        done();
      });
    });
  });
});
