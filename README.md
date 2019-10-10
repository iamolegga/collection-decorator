# collection-decorator

Decorator for adding to collection

[![Build status](https://img.shields.io/travis/iamolegga/collection-decorator.svg)](https://travis-ci.org/iamolegga/collection-decorator)
[![Coverage Status](https://coveralls.io/repos/github/iamolegga/collection-decorator/badge.svg?branch=master)](https://coveralls.io/github/iamolegga/collection-decorator?branch=master)
![David](https://img.shields.io/david/iamolegga/collection-decorator)

Typical usecase for this library:

```ts
// HasFoo.ts
import { createCollectionDecorator } from 'collection-decorator';

interface ClassType {
  foo: number;
}

const { collection, decorator } = 
  createCollectionDecorator<ClassType>();

export function fooSum() {
  let sum = 0;
  for (let value of collection.values()) {
    sum += value.foo
  }
  return sum;
}

export const HasFoo = decorator;
```

```ts
// A.ts
import { HasFoo } from './HasFoo.ts';

@HasFoo
export class A {
  static foo = 1;
}
```

```ts
// B.ts
import { HasFoo } from './HasFoo.ts';

@HasFoo
//^^^^^ TS error because class B has not `foo` property
export class B {}

// So fix it:
@HasFoo
export class B {
  static foo = 2;
}
```

```ts
// sum.ts
import { fooSum } from './HasFoo.ts';

fooSum() // 3
```
