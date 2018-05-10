import {CoreOptions, UriOptions} from 'request';
import {Configs} from "../../src/config/Configs";

describe('Utils', () => {
    describe('makeRequest', () => {
        const options = {uri:'TEST_URI'};
        const mock_TEST_ERROR = {error: 'TEST_ERROR'};
        const mock_TEST_BODY = {success: 'SUCCESS_TEST'};

        afterEach(() => {
            jest.resetModules();
        });

        describe('callbacks', () => {
            const mockCallback = jest.fn();

            afterEach(() => {
                mockCallback.mockReset();
            });

            it('calls cb with error given error', () => {
                jest.mock('request', () => (opt: UriOptions & CoreOptions, cb: Function) => cb(mock_TEST_ERROR, null, null));
                const Utils = require('../../src/util/Utils').Utils;

                const result = Utils.makeRequest(options, mockCallback);

                expect(typeof result).toEqual("undefined");
                expect(mockCallback).toBeCalled();
                expect(mockCallback).toBeCalledWith(mock_TEST_ERROR);
            });

            it('calls cb with body error given no error and body with error', () => {
                jest.mock('request', () => (opt: UriOptions & CoreOptions, cb: Function) => cb(null, null, JSON.stringify({error: mock_TEST_ERROR})));
                const Utils = require('../../src/util/Utils').Utils;

                const result = Utils.makeRequest(options, mockCallback);

                expect(typeof result).toEqual("undefined");
                expect(mockCallback).toBeCalled();
                expect(mockCallback).toBeCalledWith(mock_TEST_ERROR);
            });

            it('calls cb with body given no error and body', () => {
                jest.mock('request', () => (opt: UriOptions & CoreOptions, cb: Function) => cb(null, null, JSON.stringify(mock_TEST_BODY)));
                const Utils = require('../../src/util/Utils').Utils;

                Utils.makeRequest(options, mockCallback);
                expect(mockCallback).toBeCalledWith(null, mock_TEST_BODY);
            });

            it('calls cb with response given no error, no body', () => {
                jest.mock('request', () => (opt: UriOptions & CoreOptions, cb: Function) => cb(null, mock_TEST_BODY, null));
                const Utils = require('../../src/util/Utils').Utils;

                Utils.makeRequest(options, mockCallback);
                expect(mockCallback).toBeCalledWith(null, mock_TEST_BODY);
            });
        });

        describe('promises', () => {
            it('rejected promise given error', async () => {
                jest.mock('request', () => (opt: UriOptions & CoreOptions, cb: Function) => cb(mock_TEST_ERROR, null, null));
                const Utils = require('../../src/util/Utils').Utils;

                const result = Utils.makeRequest(options);

                await expect(result).rejects.toBe(mock_TEST_ERROR);
            });

            it('resolves body constructor object', async () => {
                jest.mock('request', () => (opt: UriOptions & CoreOptions, cb: Function) => cb(null, null, JSON.stringify(mock_TEST_BODY)));
                const Utils = require('../../src/util/Utils').Utils;

                const result = Utils.makeRequest(options);

                await expect(result).resolves.toEqual(mock_TEST_BODY);
            });
        });
    });

    describe('getRequestPayload', () => {
        const TEST_URL = 'TEST_URL';
        const EXPECTED_PAYLOAD = {
            url: TEST_URL,
            method: 'GET',
            headers: {
                'apiauth-apiuser': Configs.getAPIUser(),
                'apiauth-apikey': Configs.getAPIKey()
            }
        };

        it('returns paylaod with empty url given no url', () => {
           const Utils = require('../../src/util/Utils').Utils;
           const expectedPayload = JSON.parse(JSON.stringify(EXPECTED_PAYLOAD));
           expectedPayload.url = undefined;
           expect(Utils.getRequestPayload()).toEqual(expectedPayload);
        });

        it('returns expected payload given url', () => {
           const Utils = require('../../src/util/Utils').Utils;
           expect(Utils.getRequestPayload(TEST_URL)).toEqual(EXPECTED_PAYLOAD);
        });
    });

    describe('getLatestNewsUrl', () => {
       it('returns expected url value', () => {
           const EXPECTED_URL = 'http://www.nationalgeographic.com/bin/services/core/public/query/content.json?contentTypes=adventure/components/pagetypes/story/article,adventure/components/pagetypes/story/gallery,adventure/components/pagetypes/story/interactive,adventure/components/pagetypes/story/multipage,animals/components/pagetypes/story/article,animals/components/pagetypes/story/gallery,animals/components/pagetypes/story/interactive,animals/components/pagetypes/story/multipage,archaeologyandhistory/components/pagetypes/story/article,archaeologyandhistory/components/pagetypes/story/gallery,archaeologyandhistory/components/pagetypes/story/interactive,archaeologyandhistory/components/pagetypes/story/multipage,environment/components/pagetypes/story/article,environment/components/pagetypes/story/gallery,environment/components/pagetypes/story/interactive,environment/components/pagetypes/story/multipage,magazine/components/pagetypes/story/article,magazine/components/pagetypes/story/gallery,magazine/components/pagetypes/story/interactive,magazine/components/pagetypes/story/multipage,news/components/pagetypes/story/article,news/components/pagetypes/story/gallery,news/components/pagetypes/story/interactive,news/components/pagetypes/story/multipage,parks/components/pagetypes/story/article,parks/components/pagetypes/story/gallery,parks/components/pagetypes/story/interactive,parks/components/pagetypes/story/multipage,peopleandculture/components/pagetypes/story/article,peopleandculture/components/pagetypes/story/gallery,peopleandculture/components/pagetypes/story/interactive,peopleandculture/components/pagetypes/story/multipage,photography/components/pagetypes/story/article,photography/components/pagetypes/story/gallery,photography/components/pagetypes/story/interactive,photography/components/pagetypes/story/multipage,science/components/pagetypes/story/article,science/components/pagetypes/story/gallery,science/components/pagetypes/story/interactive,science/components/pagetypes/story/multipage,travel/components/pagetypes/story/article,travel/components/pagetypes/story/gallery,travel/components/pagetypes/story/interactive,travel/components/pagetypes/story/multipage&sort=newest&operator=or&includedTags=&excludedTags=ngs_genres:reference,ngs_visibility:omit_from_hp&excludedGuids=beda7baa-e63b-4276-8122-34e47a4e653e&pageSize=0&page=0';
           const Utils = require('../../src/util/Utils').Utils;
           expect(Utils.getLatestNewsUrl(0,0)).toEqual(EXPECTED_URL);
       });
    });

    describe('getPictureOfDayUrl', () => {
        it('returns expected url value', () => {
            const EXPECTED_URL = 'https://relay.nationalgeographic.com/proxy/distribution/feed/v1?format=jsonapi&content_type=featured_image&fields=image,uri&collection=fd5444cc-4777-4438-b9d4-5085c0564b44&publication_datetime_from=0T00:00:00Z&page=0&limit=1';
            const Utils = require('../../src/util/Utils').Utils;
            expect(Utils.getPictureOfDayUrl(0,0)).toEqual(EXPECTED_URL);
        });
    });
});