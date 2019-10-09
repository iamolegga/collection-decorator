import { createCollectionDecorator } from '../src';

interface ClassType {
  foo: string;
}

const { decorator } = createCollectionDecorator<ClassType>();

@decorator
export class A {
  static foo: '';
}

@decorator
export class B {}
