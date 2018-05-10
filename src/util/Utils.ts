import request, { CoreOptions, UrlOptions } from 'request';
import { Configs } from '../config/Configs';
import { NewsPayload, PhotoPayload } from '../index';

export class Utils {

    /* istanbul ignore next line */
  private constructor() {}

  public static makeRequest(options: UrlOptions & CoreOptions, cb?: Function): Promise<NewsPayload[]|PhotoPayload>|void {
    if (typeof cb !== 'function') {
      return new Promise((resolve, reject) => {
        request(options, (err, resp, body) => {
          if (err) {
            reject(err);
          } else {
            resolve(JSON.parse(body));
          }
        });
      });
      // tslint:disable-next-line
    } else {
      request(options, (err, resp, body) => {
        if (err) return cb(err);
        if (body) {
          const result = JSON.parse(body);
          if (result.error) {
            return cb(result.error);
            // tslint:disable-next-line
          } else {
            return cb(null, result);
          }
        }
        cb(null, resp);
      });
    }
  }

  public static getRequestPayload(url: string): UrlOptions & CoreOptions {
    return {
      url,
      method: 'GET',
      headers: {
        'apiauth-apiuser': Configs.getAPIUser(),
        'apiauth-apikey': Configs.getAPIKey(),
      },
    };
  }

  public static getLatestNewsUrl(pageSize: number, pageNumber: number): string {
    return `${Configs.getLatestNewsAPIUrl()}&pageSize=${pageSize}&page=${pageNumber}`;
  }

  public static getPictureOfDayUrl(startDate: string, numberOfDays: number): string {
    return `${Configs.getPictureOfDayAPIUrl()}&publication_datetime_from=${startDate}T00:00:00Z&page=${numberOfDays}&limit=1`;
  }
}
