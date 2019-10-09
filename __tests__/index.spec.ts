import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';
import typescript from 'typescript';
import { createCollectionDecorator } from '../src';
import config from '../tsconfig.json';

describe('units', () => {
  it('should work without passed ClassType', () => {
    const { collection, decorator } = createCollectionDecorator();

    @decorator
    class A {}

    @decorator
    class B {}

    expect(collection.values()).toContain(A);
    expect(collection.values()).toContain(B);
  });

  it('should work with passed ClassType', () => {
    interface ClassType {
      foo: string;
    }

    const { collection, decorator } = createCollectionDecorator<ClassType>();

    @decorator
    class A {
      static foo: '';
    }

    @decorator
    class B {
      static foo: '';
    }

    expect(collection.values()).toContain(A);
    expect(collection.values()).toContain(B);
  });
});

describe('typescript compiler check', () => {
  const tempFolder = path.join(
    __dirname,
    '..',
    '..',
    'collection-decorator-tests',
  );

  beforeAll(() => {
    rimraf.sync(tempFolder);
    fs.mkdirSync(tempFolder);
  });

  afterAll(() => {
    rimraf.sync(tempFolder);
  });

  it('ts should error when ClassType not matched', () => {
    const compilerOptions: typescript.CompilerOptions = {
      ...((config.compilerOptions as any) as typescript.CompilerOptions),
      outDir: tempFolder,
    };

    const program = typescript.createProgram(
      ['__tests__/bad-code-example.ts', 'src/index.ts'],
      compilerOptions,
    );

    const preEmitDiagnostics = typescript.getPreEmitDiagnostics(program);

    expect(preEmitDiagnostics).toHaveLength(1);
  });
});
