export function createCollectionDecorator<ClassType>() {
  const collection = new Set<ClassType>();
  function decorator<T>(constructor: T & ClassType) {
    collection.add(constructor);
    return constructor;
  }

  return { collection, decorator };
}
