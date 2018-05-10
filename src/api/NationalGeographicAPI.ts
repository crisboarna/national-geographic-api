import { Utils } from '../util/Utils';
import { NewsPayload, PhotoPayload } from '../index';

/**
 * Static utilities that interface with National Geographic Picture of the Day and Latest News API.
 */
export class NationalGeographicAPI {

  private static DEFAULT_PAGE_SIZE: number = 3;
  private static DEFAULT_PAGE_NUMBER: number = 0;
  private static oneDayMillis = 1000 * 60 * 60 * 24;

    /**
     * Function that returns the latest news from National Geographic. Can retrieve articles in 'pages', not only the
     * the very latest articles given combination of `pageSize` and `pageNumber`. If no `pageSize` or `pageNumber` is
     * provided, it returns the latest 3 news articles
     *
     * Supports both Promise and callback based returning of result. If no callback is provided, it returns Promise with
     * result.
     * @param pageSize - The number of articles to be returned from query. Defaults to 3.
     * @param pageNumber - The page number to retrieve, works in conjunction with `pageSize` to determine data.
     * @param cb - Optional callback otherwise Promise based return.
     * @return {Promise<NewsPayload[]> | void}
     */
  public static getLatestNews(pageSize?: number, pageNumber?: number, cb?: Function): Promise<NewsPayload[]>|void {
    const callback = this.getCallback(arguments.length, pageSize, pageNumber, cb);
    const queryPageSize: number = isNaN(pageSize) ? this.DEFAULT_PAGE_SIZE : pageSize;
    const queryPageNumber: number = isNaN(pageNumber) ? this.DEFAULT_PAGE_NUMBER : pageNumber;
    const url = Utils.getLatestNewsUrl(queryPageSize, queryPageNumber);

    return <Promise<NewsPayload[]>|void>Utils.makeRequest(Utils.getRequestPayload(url), callback);
  }

    /**
     * Function that returns the latest Photo of the Day from National Geographic. Can retrieve today's or any day in
     * the past photo up to January 1st 2009 when Photo of the Day begins. Date can be in millis or UTC string.
     *
     * If there is no photo posted for the day yet due to timezone differences, it will retrieve the previous days photo
     * until today's one is posted.
     *
     * Supports both Promise and callback based returning of result. If no callback is provided, it returns Promise with
     * result.
     *
     * @param day - The historical day to retrieve data for. Defaults to retrieving today's photo.
     * @param cb - Optional callback otherwise Promise based return.
     * @return {Promise<PhotoPayload | void>}
     */
  public static async getPhotoOfDay(day?: number|string|Function, cb?: Function): Promise<PhotoPayload|void> {
    const callback = this.getCallback(arguments.length, day, cb);
    const url = this.getPhotoUrl(day);
    const payload = await this.getPayload(url);

    if (payload.data.length > 0) {
      return this.sendResponse(payload, callback);
            // tslint:disable-next-line
        } else {
      return this.getYesterdayPhoto(callback);
    }
  }

  private static sendResponse(result: PhotoPayload, callback: Function): PhotoPayload|void {
    if (Object.prototype.toString.call(callback) === '[object Function]') {
      callback(null, result);
    } else {
      return result;
    }
  }

  private static async getYesterdayPhoto(callback: Function): Promise<PhotoPayload|void> {
    const yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    const url = this.getPhotoUrl(yesterdayDate.toISOString());
    const payload = await this.getPayload(url);
    return this.sendResponse(payload, callback);
  }

  private static async getPayload(url: string): Promise<PhotoPayload> {
    try {
      const result = await Utils.makeRequest(Utils.getRequestPayload(url));
      return <PhotoPayload>result;
    } catch (e) {
      throw new Error(`National Geographic API retrieval error: ${e.message}`);
    }
  }

  private static getCallback(numberOfArguments: number, pageSize: number|string|Function, pageNumber: number|Function,
                             cb?: Function): Function {
    if (numberOfArguments === 3) {
      return cb;
        // tslint:disable-next-line
    } else if (numberOfArguments === 2) {
      if (Object.prototype.toString.call(pageNumber) === '[object Function]') {
        return <Function>pageNumber;
      }
    } else if (numberOfArguments === 1) {
      if (Object.prototype.toString.call(pageSize) === '[object Function]') {
        return <Function>pageSize;
      }
    }
  }

  private static getPhotoUrl(day: number|string|Function) {
    let fromDate;
    let numberOfDays;

    if (Object.prototype.toString.call(day) !== '[object String]' || isNaN(Date.parse(<string>day))) {
      const targetDate = new Date().toISOString();
      fromDate = targetDate.substring(0, targetDate.indexOf('T'));
      numberOfDays = 1;
    } else {
      const targetDate = new Date(<string>day);
      numberOfDays = Math.floor(Math.abs((Date.now() - targetDate.getTime()) / this.oneDayMillis));
      const targetDateISO = targetDate.toISOString();
      fromDate = targetDateISO.substring(0, targetDateISO.indexOf('T'));
    }

    return Utils.getPictureOfDayUrl(fromDate, numberOfDays);
  }
}
