import {getRetroaction} from '../../src/util/solution'

test('test getRetroaction ne retourne pas un undefined', () => {
  expect(getRetroaction != undefined).toBeTruthy();
});
