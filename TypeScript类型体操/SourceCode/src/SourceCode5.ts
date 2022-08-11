// 当类型参数为联合类型，并且在条件类型左边直接引用该类型参数的时候，
// TypeScript 会把每一个元素单独传入来做类型运算，
// 最后再合并成联合类型，这种语法叫做分布式条件类型。


type UppercaseA<Item extends string> = 
    Item extends 'a' ?  Uppercase<Item> : Item;

type UppercaseAResult = UppercaseA<'a' | 'b' | 'c'>;

type addStr = `${ 'a' | 'b' | 'c'}~~`;

type TestUnion<A, B = A> = A  extends A ? { a: A, b: B} : never;

type TestUnionResult = TestUnion<'a' | 'b' | 'c'>;

// IsUnion
type IsUnion<A, B = A> =
    A extends A
        ? [B] extends [A]
            ? false
            : true
        : never

type IsUnionResult = IsUnion<'a'|'b'|'c'>;

type IsUnionResult2 = IsUnion<['a'|'b'|'c']>;



