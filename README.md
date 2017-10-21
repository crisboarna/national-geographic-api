# national-geographic-api

### NodeJS National Geographic API
[![version](https://img.shields.io/npm/v/national-geographic-api.svg)](http://npm.im/national-geographic-api)
[![travis build](https://img.shields.io/travis/crisboarna/national-geographic-api.svg)](https://travis-ci.org/crisboarna/national-geographic-api)
[![codecov coverage](https://img.shields.io/codecov/c/github/crisboarna/national-geographic-api.svg)](https://codecov.io/gh/crisboarna/national-geographic-api)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/8d87ae38dea34aa09d0daa0ab81b81cd)](https://www.codacy.com/app/crisboarna/national-geographic-api?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=crisboarna/national-geographic-api&amp;utm_campaign=Badge_Grade)
[![dependency status](https://img.shields.io/david/crisboarna/national-geographic-api.svg)](https://david-dm.org/crisboarna/national-geographic-api)
[![MIT License](https://img.shields.io/npm/l/national-geographic-api.svg)](http://opensource.org/licenses/MIT)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](http://commitizen.github.io/cz-cli/)
![stability-stable](https://img.shields.io/badge/stability-stable-green.svg)
[![Greenkeeper](https://badges.greenkeeper.io/crisboarna/national-geographic-api.svg)](https://greenkeeper.io/)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Installation

```
npm install national-geographic-api
```

## Table of Contents
* [Setup](#setup)
* [Features](#features)

## Setup

Import
```javascript
const natgeo = require('national-geographic-api').API;
```

## Features

- Get Latest News articles with title, description, img and other metadata
- Paginate news digest
- Promises and callback support on all functions, if no callback provided, promise returned, allows you to manage flow as you desire 
- ES6+ code

### Latest News

```javascript
natgeo.getLatestNews(`PAGE_SIZE` , `PAGE_NUMBER` , `CALLBACK` )
    .then((result) => ...);
```

- `PAGE_SIZE` - optional, defaults to 3 story items
- `PAGE_NUMBER` - optional, defaults to page 0
- `CALLBACK` - optional, if no callback provided returns a promise