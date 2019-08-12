import { expectType, expectError } from 'tsd';

import { of, Observable } from 'rxjs';
import { combineLatest } from 'rxjs/operators';

const a = of(1, 2, 3);
const b = of('a', 'b', 'c');
const c = of('d', 'e', 'f');
const d = of('g', 'h', 'i');
const e = of('j', 'k', 'l');
const f = of('m', 'n', 'o');
const g = of('p', 'q', 'r');

describe('combineLatest', () => {
  describe('without project parameter', () => {
    it('should infer correctly with 1 param', () => {
      expectType<Observable<[number, string]>>(a.pipe(combineLatest(b)));
    });

    it('should infer correctly with 2 params', () => {
      expectType<Observable<[number, string, string]>>(a.pipe(combineLatest(b, c)));
    });

    it('should infer correctly with 3 params', () => {
      expectType<Observable<[number, string, string, string]>>(a.pipe(combineLatest(b, c, d)));
    });

    it('should infer correctly with 4 params', () => {
      expectType<Observable<[number, string, string, string, string]>>(a.pipe(combineLatest(b, c, d, e)));
    });

    it('should infer correctly with 5 params', () => {
      expectType<Observable<[number, string, string, string, string, string]>>(a.pipe(combineLatest(b, c, d, e, f)));
    });

    it('should only accept maximum params of 5', () => {
      expectError(a.pipe(combineLatest(b, c, d, e, f, g)));
    });
  });

  describe('with project parameter', () => {
    it('should infer correctly with project param', () => {
      const a = of(1, 2, 3);
      expectType<Observable<string>>(a.pipe(combineLatest(v1 => 'b')));
    });

    it('should infer correctly with 1 param', () => {
      expectType<Observable<string>>(a.pipe(combineLatest(b, (a, b) => b)));
    });

    it('should infer correctly with 2 params', () => {
      expectType<Observable<string>>(a.pipe(combineLatest(b, c, (a, b, c) => b + c)));
    });

    it('should infer correctly with 3 params', () => {
      expectType<Observable<string>>(a.pipe(combineLatest(b, c, d, (a, b, c, d) => b + c)));
    });

    it('should infer correctly with 4 params', () => {
      expectType<Observable<string>>(a.pipe(combineLatest(b, c, d, e, (a, b, c, d, e) => b + c)));
    });

    it('should infer correctly with 5 params', () => {
      expectType<Observable<string>>(a.pipe(combineLatest(b, c, d, e, f, (a, b, c, d, e, f) => b + c)));
    });

    it('should fail to infer correctly with more than 5 params', () => {
      expectError(a.pipe(combineLatest(b, c, d, e, f, g, (a, b, c, d, e, f) => b + c)));
    });

    it('should infer correctly with array param', () => {
      const a = of(1, 2, 3);
      const b = [of('a', 'b', 'c')];
      expectType<Observable<Observable<string>>>(a.pipe(combineLatest(b, (a, b) => b)));
    });
  });
});
