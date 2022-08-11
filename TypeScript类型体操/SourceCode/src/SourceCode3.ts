
// Promise 的递归复用
// DeepPromiseValueType

type DeepPromiseValueType<P extends Promise<unknown>> =
    P extends Promise<infer ValueType> 
        ? ValueType extends Promise<unknown>
            ? DeepPromiseValueType<ValueType>
            : ValueType
        : never;

type DeepPromiseResult = DeepPromiseValueType<Promise<Promise<Record<string, any>>>>


// 数组类型的递归

// ReverseArr

// type arr = [1,2,3,4,5];
// 转变
// type arr = [5,4,3,2,1];

type ReverseArr<Arr extends unknown[]> = 
    Arr extends [infer One, infer Two, infer Three, infer Four, infer Five]
        ? [Five, Four, Three, Two, One]
        : never;

type ReverseArrResult = ReverseArr<[1,2,3,4,5]>


// Includes

type Includes<Arr extends unknown[], FindItem> = 
    Arr extends [infer First, ...infer Rest]
        ? IsEqual<First, FindItem> extends true
            ? true
            : Includes<Rest, FindItem>
        : false;

type IsEqual<A, B> = (A extends B ? true : false) & (B extends A ? true : false);

type IncludesResult = Includes<[1,2,3,4,5], 4>;
type IncludesResult2 = Includes<[1,2,3,4,5], 6>;


// RemoveItem
type RemoveItem<
    Arr extends unknown[], 
    Item, 
    Result extends unknown[] = []
> = Arr extends [infer First, ...infer Rest]
        ? IsEqual<First, Item> extends true
            ? RemoveItem<Rest, Item, Result>
            : RemoveItem<Rest, Item, [...Result, First]>
        : Result;
type RemoveItemResult = RemoveItem<[1,2,3,4], 2>


// BuildArray

type BuildArray<
    Length extends number, 
    Ele = unknown, 
    Arr extends unknown[] = []
> = Arr['length'] extends Length 
        ? Arr 
        : BuildArray<Length, Ele, [...Arr, Ele]>;

type BuildArrResult = BuildArray<5>;

// 字符串类型的递归

// ReplaceAll

type ReplaceAll<
    Str extends string, 
    From extends string, 
    To extends string
> = Str extends `${infer Left}${From}${infer Right}`
        ? `${Left}${To}${ReplaceAll<Right, From, To>}`
        : Str;


type ReplaceAllResult = ReplaceAll<'this is a ? dog', '?', 'single'>;


// StringToUnion
// 把 'dong' 转为 'd' | 'o' | 'n' | 'g'。

type StringToUnion<Str extends string> = 
    Str extends `${infer First}${infer Rest}`
        ? First | StringToUnion<Rest>
        : never;

type StringToUnionResult = StringToUnion<'singleDog'>;

// ReverseStr

type ReverseStr<
    Str extends string, 
    Result extends string = ''
> = Str extends `${infer First}${infer Rest}` 
    ? ReverseStr<Rest, `${First}${Result}`> 
    : Result;

type ReverseStrResult = ReverseStr<'hello'>;


// 对象类型的递归

// DeepReadonly
type obj3 = {
  a: {
      b: {
          c: {
              f: () => 'dong',
              d: {
                  e: {
                      guang: string
                  }
              }
          }
      }
  }
}
type DeepReadonly<Obj extends Record<string, any>> =
    Obj extends any
        ? {
            readonly [Key in keyof Obj]:
                Obj[Key] extends object
                    ? Obj[Key] extends Function
                        ? Obj[Key] 
                        : DeepReadonly<Obj[Key]>
                    : Obj[Key]
        }
        : never;

type DeepReadonlyResult = DeepReadonly<obj3>










