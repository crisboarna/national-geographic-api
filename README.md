# national-geographic-api

### NodeJS National Geographic API
[![version](https://img.shields.io/npm/v/national-geographic-api.svg)](http://npm.im/national-geographic-api)
[![travis build](https://img.shields.io/travis/crisboarna/national-geographic-api.svg)](https://travis-ci.org/crisboarna/national-geographic-api)
[![codecov coverage](https://img.shields.io/codecov/c/github/crisboarna/national-geographic-api.svg)](https://codecov.io/gh/crisboarna/national-geographic-api)
[![dependency status](https://img.shields.io/david/crisboarna/national-geographic-api.svg)](https://david-dm.org/crisboarna/national-geographic-api)
[![Known Vulnerabilities](https://app.snyk.io/test/github/crisboarna/national-geographic-api/badge.svg?targetFile=package.json)](https://snyk.io/test/github/crisboarna/national-geographic-api?targetFile=package.json)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/8d87ae38dea34aa09d0daa0ab81b81cd)](https://www.codacy.com/app/crisboarna/national-geographic-api?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=crisboarna/national-geographic-api&amp;utm_campaign=Badge_Grade)
[![MIT License](https://img.shields.io/npm/l/national-geographic-api.svg)](http://opensource.org/licenses/MIT)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](http://commitizen.github.io/cz-cli/)
![stability-stable](https://img.shields.io/badge/stability-stable-green.svg)
[![Greenkeeper](https://badges.greenkeeper.io/crisboarna/national-geographic-api.svg)](https://greenkeeper.io/)
[![code style](https://img.shields.io/badge/code%20style-airbnb-brightgreen.svg)](https://img.shields.io/badge/code%20style-airbnb-brightgreen.svg)

## Table of Contents
* [Documentation](#documentation)
* [Installation](#installation)
* [Setup](#setup)
* [Features](#features)
  * [Latest News](#latest-news)
  * [Photo of the Day](#photo-of-the-day)

## Documentation
You can find documentation [here](https://crisboarna.github.io/national-geographic-api/)

## Installation
```
npm i national-geographic-api
```

## Setup

Import
```javascript
const natgeo = require('national-geographic-api').NationalGeographicAPI;
```
or
```typescript
import {NationalGeographicAPI} from 'national-geographic-api';
```

## Features

- Get Latest News articles with title, description, img and other metadata
- Paginate news digest
- Promises and callback support on all functions, if no callback provided, promise returned, allows you to manage flow as you desire 
- Typescript code with typings

### Latest News

Returns the latest news from National Geographic [News API](https://www.nationalgeographic.com/latest-stories/) with metadata.
```javascript
natgeo.getLatestNews(`PAGE_SIZE` , `PAGE_NUMBER` , `CALLBACK` )
    .then((result) => ...);
```
or
```typescript
const result = await NationalGeographicAPI.getLatestNews(`PAGE_SIZE` , `PAGE_NUMBER` , `CALLBACK`);
```

- `PAGE_SIZE` - optional, defaults to 3 story items
- `PAGE_NUMBER` - optional, defaults to page 0
- `CALLBACK` - optional, if no callback provided returns a promise

### Photo of the Day

Returns requested Photo of the Day from National Geographic [archives](https://www.nationalgeographic.com/photography/photo-of-the-day/).
```javascript
natgeo.getPhotoOfDay(`DAY` , `CALLBACK`)
    .then((result) => ...);
```
or
```typescript
const result = await NationalGeographicAPI.getPhotoOfDay(`DAY` , `CALLBACK`);
```

- `DAY` - optional, defaults to today. Expects ISO date format
- `CALLBACK` - optional, if no callback provided returns a promise