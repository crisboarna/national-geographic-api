/* eslint-disable semi */
'use strict';

import request from 'request';

const makeRequest = function makeRequest (options, cb) {
  if (typeof cb !== 'function') {
    return new Promise((resolve, reject) => {
      request(options, (err, resp, body) => {
        if (err) {
          reject(err);
        } else {
          resolve(body);
        }
      });
    });
  } else {
    request(options, (err, resp, body) => {
      if (err) return cb(err);
      if (body.error) return cb(body.error);
      cb(null, body);
    });
  }
};

export { makeRequest };
