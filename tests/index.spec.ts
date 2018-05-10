describe('national-geographic-api', () => {
   it('exports NationalGeographicAPI class', () => {
       const api = require('../src/index');
       expect(api.NationalGeographicAPI).toBeDefined();
   });
});