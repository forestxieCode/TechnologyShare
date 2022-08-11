// IsAny
// any 类型与任何类型的交叉都是 any，也就是 1 & any 结果是 any。

type IsAny<T> = 'dong' extends ('guang' & T) ? true : false;

type IsAnyResult= IsAny<any>;

type IsAnyResult2= IsAny<'guang'>;


// IsEqual

type IsEqualRes = IsEqual<'a', any>;

type IsEqual2<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2)
    ? true : false;

type IsEqual2Res = IsEqual2<'a', any>;


// IsUnion

type IsUnionRes = IsUnion<1 | 2>;

type IsUnionRes2 = IsUnion<1>;

// IsNever

type TestNever<T> = T extends number ? 1 : 2;

type TestNeverRes = TestNever<never>;

type IsNever<T> = [T] extends [never] ? true : false;

type IsNeverRes = IsNever<never>;

type TestAny<T> = T extends number ? 1 : 2;

type TestAnyRes = TestAny<any>;



// as const

const InfoObj = {
    name: 'zhangsna',
    age: 12
} as const

type InfoObjType = typeof InfoObj;


// ....










