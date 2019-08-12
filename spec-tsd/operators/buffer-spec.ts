import { expectType, expectError } from 'tsd';
import { Observable, of } from 'rxjs';
import { buffer } from 'rxjs/operators';

it('should infer correctly', () => {
  expectType<Observable<number[]>>(of(1, 2, 3).pipe(buffer(of('foo'))));
});

it('should enforce types', () => {
  expectError(of(1, 2, 3).pipe(buffer()));
  expectError(of(1, 2, 3).pipe(buffer(6)));
});
