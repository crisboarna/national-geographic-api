describe('NationalGeographicAPI', () => {

    const TEST_PAGE_SIZE: number = 1234;
    const TEST_PAGE_NUMBER: number = 9876;
    const TEST_URL: string= 'TEST_URL';
    const TEST_REQUEST_PAYLOAD = 'TEST_PAYLOAD';
    const TEST_INVALID_PARAM = 'TEST_INVALID_PARAM';
    const mockRequestPayload = jest.fn();
    const mockMakeRequest = jest.fn();
    const mockLatestNewsUrl = jest.fn();
    const mockPictureOfDayUrl = jest.fn();

    beforeEach(()=> {
        mockLatestNewsUrl.mockReturnValueOnce(TEST_URL);
        mockPictureOfDayUrl.mockReturnValueOnce(TEST_URL);
        mockRequestPayload.mockReturnValueOnce(TEST_REQUEST_PAYLOAD);
        jest.mock('../../src/util/Utils', () => ({ Utils: {
                getRequestPayload: mockRequestPayload,
                makeRequest: mockMakeRequest,
                getLatestNewsUrl: mockLatestNewsUrl,
                getPictureOfDayUrl: mockPictureOfDayUrl
            }}));
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('getLatestNews', () => {
        describe('promises', () => {
            it('given no cb returns promise with default payload', () => {
                const NationalGeographicAPI = require('../../src/api/NationalGeographicAPI').NationalGeographicAPI;

                NationalGeographicAPI.getLatestNews();

                expect(mockLatestNewsUrl).toBeCalled();
                expect(mockLatestNewsUrl).toHaveBeenCalledWith(3, 0);
                expect(mockRequestPayload).toBeCalled();
                expect(mockRequestPayload).toHaveBeenCalledWith(TEST_URL);
                expect(mockMakeRequest).toBeCalled();
                expect(mockMakeRequest).toHaveBeenCalledWith(TEST_REQUEST_PAYLOAD, undefined);
            });

            it('given no cb and invalid page size returns promise with default values', () => {
                const NationalGeographicAPI = require('../../src/api/NationalGeographicAPI').NationalGeographicAPI;

                NationalGeographicAPI.getLatestNews(TEST_INVALID_PARAM);

                expect(mockLatestNewsUrl).toBeCalled();
                expect(mockLatestNewsUrl).toHaveBeenCalledWith(3, 0);
                expect(mockRequestPayload).toBeCalled();
                expect(mockRequestPayload).toHaveBeenCalledWith(TEST_URL);
                expect(mockMakeRequest).toBeCalled();
                expect(mockMakeRequest).toHaveBeenCalledWith(TEST_REQUEST_PAYLOAD, undefined);
            });

            it('given no cb and invalid pageSize, pageNumber returns promise with default values', () => {
                const NationalGeographicAPI = require('../../src/api/NationalGeographicAPI').NationalGeographicAPI;

                NationalGeographicAPI.getLatestNews(TEST_INVALID_PARAM, TEST_INVALID_PARAM);

                expect(mockLatestNewsUrl).toBeCalled();
                expect(mockLatestNewsUrl).toHaveBeenCalledWith(3, 0);
                expect(mockRequestPayload).toBeCalled();
                expect(mockRequestPayload).toHaveBeenCalledWith(TEST_URL);
                expect(mockMakeRequest).toBeCalled();
                expect(mockMakeRequest).toHaveBeenCalledWith(TEST_REQUEST_PAYLOAD, undefined);
            });

            it('given no cb, valid pageSize, invalid pageNumber returns promise with default values', () => {
                const NationalGeographicAPI = require('../../src/api/NationalGeographicAPI').NationalGeographicAPI;

                NationalGeographicAPI.getLatestNews(TEST_PAGE_SIZE, TEST_INVALID_PARAM);

                expect(mockLatestNewsUrl).toBeCalled();
                expect(mockLatestNewsUrl).toHaveBeenCalledWith(TEST_PAGE_SIZE, 0);
                expect(mockRequestPayload).toBeCalled();
                expect(mockRequestPayload).toHaveBeenCalledWith(TEST_URL);
                expect(mockMakeRequest).toBeCalled();
                expect(mockMakeRequest).toHaveBeenCalledWith(TEST_REQUEST_PAYLOAD, undefined);
            });

            it('given no cb, valid pageSize, pageNumber returns promise with default values', () => {
                const NationalGeographicAPI = require('../../src/api/NationalGeographicAPI').NationalGeographicAPI;

                NationalGeographicAPI.getLatestNews(TEST_PAGE_SIZE, TEST_PAGE_NUMBER);

                expect(mockLatestNewsUrl).toBeCalled();
                expect(mockLatestNewsUrl).toHaveBeenCalledWith(TEST_PAGE_SIZE, TEST_PAGE_NUMBER);
                expect(mockRequestPayload).toBeCalled();
                expect(mockRequestPayload).toHaveBeenCalledWith(TEST_URL);
                expect(mockMakeRequest).toBeCalled();
                expect(mockMakeRequest).toHaveBeenCalledWith(TEST_REQUEST_PAYLOAD, undefined);
            });
        });

        describe('callbacks', () => {
            const mockCallback = jest.fn();
            it('given cb, and no params, generates payload with default values', () => {
                const NationalGeographicAPI = require('../../src/api/NationalGeographicAPI').NationalGeographicAPI;

                NationalGeographicAPI.getLatestNews(mockCallback);

                expect(mockLatestNewsUrl).toBeCalled();
                expect(mockLatestNewsUrl).toHaveBeenCalledWith(3, 0);
                expect(mockRequestPayload).toBeCalled();
                expect(mockRequestPayload).toHaveBeenCalledWith(TEST_URL);
                expect(mockMakeRequest).toBeCalled();
                expect(mockMakeRequest).toHaveBeenCalledWith(TEST_REQUEST_PAYLOAD, mockCallback);
            });

            it('given cb, and invalid pageSize, generates payload with default values', () => {
                const NationalGeographicAPI = require('../../src/api/NationalGeographicAPI').NationalGeographicAPI;

                NationalGeographicAPI.getLatestNews(TEST_INVALID_PARAM, mockCallback);

                expect(mockLatestNewsUrl).toBeCalled();
                expect(mockLatestNewsUrl).toHaveBeenCalledWith(3, 0);
                expect(mockRequestPayload).toBeCalled();
                expect(mockRequestPayload).toHaveBeenCalledWith(TEST_URL);
                expect(mockMakeRequest).toBeCalled();
                expect(mockMakeRequest).toHaveBeenCalledWith(TEST_REQUEST_PAYLOAD, mockCallback);
            });

            it('given cb, and invalid pageSize, pageNumber, generates payload with default values', () => {
                const NationalGeographicAPI = require('../../src/api/NationalGeographicAPI').NationalGeographicAPI;

                NationalGeographicAPI.getLatestNews(TEST_INVALID_PARAM, TEST_INVALID_PARAM, mockCallback);

                expect(mockLatestNewsUrl).toBeCalled();
                expect(mockLatestNewsUrl).toHaveBeenCalledWith(3, 0);
                expect(mockRequestPayload).toBeCalled();
                expect(mockRequestPayload).toHaveBeenCalledWith(TEST_URL);
                expect(mockMakeRequest).toBeCalled();
                expect(mockMakeRequest).toHaveBeenCalledWith(TEST_REQUEST_PAYLOAD, mockCallback);
            });

            it('given cb, valid pageSize, invalid pageNumber, generates payload with default values', () => {
                const NationalGeographicAPI = require('../../src/api/NationalGeographicAPI').NationalGeographicAPI;

                NationalGeographicAPI.getLatestNews(TEST_PAGE_SIZE, TEST_INVALID_PARAM, mockCallback);

                expect(mockLatestNewsUrl).toBeCalled();
                expect(mockLatestNewsUrl).toHaveBeenCalledWith(TEST_PAGE_SIZE, 0);
                expect(mockRequestPayload).toBeCalled();
                expect(mockRequestPayload).toHaveBeenCalledWith(TEST_URL);
                expect(mockMakeRequest).toBeCalled();
                expect(mockMakeRequest).toHaveBeenCalledWith(TEST_REQUEST_PAYLOAD, mockCallback);
            });

            it('given cb, valid pageSize, pageNumber, generates payload with default values', () => {
                const NationalGeographicAPI = require('../../src/api/NationalGeographicAPI').NationalGeographicAPI;

                NationalGeographicAPI.getLatestNews(TEST_PAGE_SIZE, TEST_PAGE_NUMBER, mockCallback);

                expect(mockLatestNewsUrl).toBeCalled();
                expect(mockLatestNewsUrl).toHaveBeenCalledWith(TEST_PAGE_SIZE, TEST_PAGE_NUMBER);
                expect(mockRequestPayload).toBeCalled();
                expect(mockRequestPayload).toHaveBeenCalledWith(TEST_URL);
                expect(mockMakeRequest).toBeCalled();
                expect(mockMakeRequest).toHaveBeenCalledWith(TEST_REQUEST_PAYLOAD, mockCallback);
            });
        });
    });

    describe('getPhotoOfDay', () => {
        const oneDayMillis = 1000*60*60*24;
        const now = new Date().toISOString();
        const TEST_DAY_DEFAULT = now.substring(0, now.indexOf('T'));
        const TEST_NUMBER_OF_DAYS_DEFAULT = 1;
        const TEST_HISTORICAL_DAY = '2016-12-14';
        const TEST_HISTORICAL_DATE = new Date(TEST_HISTORICAL_DAY);
        const TEST_HISTORICAL_NUMBER_OF_DAYS = Math.floor(Math.abs((Date.now() - TEST_HISTORICAL_DATE.getTime()) / oneDayMillis));
        const TEST_ERROR = 'TEST_ERROR';
        const TEST_API_PAYLOAD = {data:[{payload: 'TEST_RESULT'}]};
        const TEST_EMPTY_ARRAY: Object[] = [];
        const TEST_API_PAYLOAD_EMPTY = {data: TEST_EMPTY_ARRAY};

        describe('promises', () => {
            it('given no cb and no params, throws error given backend reject', async () => {
                mockMakeRequest.mockReturnValueOnce(Promise.reject(TEST_ERROR));
                const NationalGeographicAPI = require('../../src/api/NationalGeographicAPI').NationalGeographicAPI;

                await expect(NationalGeographicAPI.getPhotoOfDay()).rejects.toThrow('National Geographic API retrieval error');
            });

            it('given no cb and no params and api content returns current day payload', async () => {
                mockMakeRequest.mockReturnValueOnce(Promise.resolve(TEST_API_PAYLOAD));
                const NationalGeographicAPI = require('../../src/api/NationalGeographicAPI').NationalGeographicAPI;

                const result = await NationalGeographicAPI.getPhotoOfDay();

                expect(mockPictureOfDayUrl).toBeCalled();
                expect(mockPictureOfDayUrl).toHaveBeenCalledWith(TEST_DAY_DEFAULT, TEST_NUMBER_OF_DAYS_DEFAULT);
                expect(mockRequestPayload).toBeCalled();
                expect(mockRequestPayload).toHaveBeenCalledWith(TEST_URL);
                expect(mockMakeRequest).toBeCalled();
                expect(mockMakeRequest).toHaveBeenCalledWith(TEST_REQUEST_PAYLOAD);
                expect(result).toEqual(TEST_API_PAYLOAD);
            });

            it('given no cb and no params and no api content returns yesterday payload', async () => {
                mockPictureOfDayUrl.mockReturnValueOnce(TEST_URL);
                mockRequestPayload.mockReturnValueOnce(TEST_REQUEST_PAYLOAD);
                mockMakeRequest.mockReturnValueOnce(Promise.resolve(TEST_API_PAYLOAD_EMPTY));
                mockMakeRequest.mockReturnValueOnce(Promise.resolve(TEST_API_PAYLOAD));

                const NationalGeographicAPI = require('../../src/api/NationalGeographicAPI').NationalGeographicAPI;

                const result = await NationalGeographicAPI.getPhotoOfDay();

                expect(mockPictureOfDayUrl).toBeCalled();
                expect(mockPictureOfDayUrl).toHaveBeenCalledWith(TEST_DAY_DEFAULT, TEST_NUMBER_OF_DAYS_DEFAULT);
                expect(mockRequestPayload).toBeCalled();
                expect(mockRequestPayload).toHaveBeenCalledWith(TEST_URL);
                expect(mockMakeRequest).toBeCalled();
                expect(mockMakeRequest).toHaveBeenCalledWith(TEST_REQUEST_PAYLOAD);
                expect(result).toEqual(TEST_API_PAYLOAD);
            });

            it('given no cb and date, return expected day payload', async () => {
                mockMakeRequest.mockReturnValueOnce(Promise.resolve(TEST_API_PAYLOAD));
                const NationalGeographicAPI = require('../../src/api/NationalGeographicAPI').NationalGeographicAPI;

                const result = await NationalGeographicAPI.getPhotoOfDay(TEST_HISTORICAL_DAY);

                expect(mockPictureOfDayUrl).toBeCalled();
                expect(mockPictureOfDayUrl).toHaveBeenCalledWith(TEST_HISTORICAL_DAY, TEST_HISTORICAL_NUMBER_OF_DAYS);
                expect(mockRequestPayload).toBeCalled();
                expect(mockRequestPayload).toHaveBeenCalledWith(TEST_URL);
                expect(mockMakeRequest).toBeCalled();
                expect(mockMakeRequest).toHaveBeenCalledWith(TEST_REQUEST_PAYLOAD);
                expect(result).toEqual(TEST_API_PAYLOAD);
            });
        });

        describe('callbacks', () => {
            const mockCallback = jest.fn();

            it('given cb and no params, throws error given backend reject', async () => {
                mockMakeRequest.mockReturnValueOnce(Promise.reject(TEST_ERROR));
                const NationalGeographicAPI = require('../../src/api/NationalGeographicAPI').NationalGeographicAPI;

                await expect(NationalGeographicAPI.getPhotoOfDay(mockCallback)).rejects.toThrow('National Geographic API retrieval error');
            });

            it('given cb and no params and api content returns current day payload', async () => {
                mockMakeRequest.mockReturnValueOnce(Promise.resolve(TEST_API_PAYLOAD));
                const NationalGeographicAPI = require('../../src/api/NationalGeographicAPI').NationalGeographicAPI;

                await NationalGeographicAPI.getPhotoOfDay(mockCallback);

                expect(mockPictureOfDayUrl).toBeCalled();
                expect(mockPictureOfDayUrl).toHaveBeenCalledWith(TEST_DAY_DEFAULT, TEST_NUMBER_OF_DAYS_DEFAULT);
                expect(mockRequestPayload).toBeCalled();
                expect(mockRequestPayload).toHaveBeenCalledWith(TEST_URL);
                expect(mockMakeRequest).toBeCalled();
                expect(mockMakeRequest).toHaveBeenCalledWith(TEST_REQUEST_PAYLOAD);
                expect(mockCallback).toBeCalled();
                expect(mockCallback).toHaveBeenCalledWith(null, TEST_API_PAYLOAD);
            });

            it('given cb and no params and no api content returns yesterday payload', async () => {
                mockPictureOfDayUrl.mockReturnValueOnce(TEST_URL);
                mockRequestPayload.mockReturnValueOnce(TEST_REQUEST_PAYLOAD);
                mockMakeRequest.mockReturnValueOnce(Promise.resolve(TEST_API_PAYLOAD_EMPTY));
                mockMakeRequest.mockReturnValueOnce(Promise.resolve(TEST_API_PAYLOAD));

                const NationalGeographicAPI = require('../../src/api/NationalGeographicAPI').NationalGeographicAPI;

                await NationalGeographicAPI.getPhotoOfDay(mockCallback);

                expect(mockPictureOfDayUrl).toBeCalled();
                expect(mockPictureOfDayUrl).toHaveBeenCalledWith(TEST_DAY_DEFAULT, TEST_NUMBER_OF_DAYS_DEFAULT);
                expect(mockRequestPayload).toBeCalled();
                expect(mockRequestPayload).toHaveBeenCalledWith(TEST_URL);
                expect(mockMakeRequest).toBeCalled();
                expect(mockMakeRequest).toHaveBeenCalledWith(TEST_REQUEST_PAYLOAD);
                expect(mockCallback).toBeCalled();
                expect(mockCallback).toHaveBeenCalledWith(null, TEST_API_PAYLOAD);
            });

            it('given cb and date, return expected day payload', async () => {
                mockMakeRequest.mockReturnValueOnce(Promise.resolve(TEST_API_PAYLOAD));
                const NationalGeographicAPI = require('../../src/api/NationalGeographicAPI').NationalGeographicAPI;

                await NationalGeographicAPI.getPhotoOfDay(TEST_HISTORICAL_DAY, mockCallback);

                expect(mockPictureOfDayUrl).toBeCalled();
                expect(mockPictureOfDayUrl).toHaveBeenCalledWith(TEST_HISTORICAL_DAY, TEST_HISTORICAL_NUMBER_OF_DAYS);
                expect(mockRequestPayload).toBeCalled();
                expect(mockRequestPayload).toHaveBeenCalledWith(TEST_URL);
                expect(mockMakeRequest).toBeCalled();
                expect(mockMakeRequest).toHaveBeenCalledWith(TEST_REQUEST_PAYLOAD);
                expect(mockCallback).toBeCalled();
                expect(mockCallback).toHaveBeenCalledWith(null, TEST_API_PAYLOAD);
            });
        });
    });
});