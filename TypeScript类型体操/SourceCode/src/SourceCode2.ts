// 数组类型的重新构造

// Push

type Push<Arr extends  unknown[], Ele> = [...Arr, Ele];

type PushResult = Push<[1,2,3,4], 6>


// Unshift

type Unshift<Arr extends  unknown[], Ele> = [Ele, ...Arr];


type UnshiftResult = Unshift<[1,2,3], 0>;

// Zip

// type tuple1 = [1,2];
// type tuple2 = ['guang', 'dong'];

// 转换成这样

// type tuple = [[1, 'guang'], [2, 'dong']];

type Zip<One extends [unknown, unknown], Other extends [unknown, unknown]> = 
    One extends [infer OneFirst, infer OneSecond]
        ? Other extends [infer OtherFirst, infer OtherSecond]
            ? [[OneFirst, OtherFirst], [OneSecond, OtherSecond]] :[] 
                : [];

type ZipResult = Zip<[1,2], ['guang', 'dong']>;


// 字符串类型的重新构造

// CapitalizeStr

// 字符串字面量类型的 'guang' 转为首字母大写的 'Guang'

type CapitalizeStr<Str extends string> = 
    Str extends `${infer First}${infer Rest}` 
        ? `${Uppercase<First>}${Rest}` : Str;

type CapitalizeStrResult = CapitalizeStr<'guang'>;

// CamelCase
// 实现 dong_dong_dong 到 dongDongDong 的变换

type CamelCase<Str extends string> = 
    Str extends `${infer Left}_${infer Right}${infer Rest}`
        ? `${Left}${Uppercase<Right>}${CamelCase<Rest>}`
        : Str;

type CamelCaseResult = CamelCase<'dong_dong_dong'>;


// DropSubStr
// 删除字符串中的某个子串

type DropSubStr<Str extends string, SubStr extends string> = 
    Str extends `${infer Prefix}${SubStr}${infer Suffix}` 
        ? DropSubStr<`${Prefix}${Suffix}`, SubStr> : Str;

type DropResult = DropSubStr<'dong~~~', '~'>;


// 函数类型的重新构造

type AppendArgument<Func extends Function, Arg> = 
    Func extends (...args: infer Args) => infer ReturnType 
        ? (...args: [...Args, Arg]) => ReturnType : never;

type AppendArgumentResult = AppendArgument<(name:string) => boolean, number>;

// 索引类型的重新构造

type obj = {
  name: string;
  age: number;
  gender: boolean;
}

type ToReadonly<Obj extends object> = { 
  readonly [Key in keyof Obj]: Obj[Key]
}

type obj2 = ToReadonly<obj>

// UppercaseKey

type UppercaseKey<Obj extends object> = { 
  [Key in keyof Obj as Uppercase<Key & string>]: Obj[Key]
}

type UppercaseKeyResult = UppercaseKey<{name: 'zhangsan', age: 2}>


// ToPartial

type ToPartial<T> = {
  [Key in keyof T]?: T[Key]
}

type PartialResult = ToPartial<{name: string; age: number}>


// ToMutable

type ToMutable<T> = {
  -readonly [Key in keyof T]: T[Key]
}

type ToMutableResult = ToMutable<{
  readonly name: string;
  age: number
}>

// ToRequired

type ToRequired<T> = {
  [Key in keyof T]-?: T[Key]
}

type ToRequiredResult = ToRequired<{
  name?: string;
  age: number
}>


// FilterByValueType
// 构造新索引类型的时候根据值的类型做下过滤

type FilterByValueType<
    Obj extends Record<string, any>, 
    ValueType
> = {
    [Key in keyof Obj 
        as Obj[Key] extends ValueType ? Key : never]
        : Obj[Key]
}

interface People {
  name: string;
  age: number;
  hobby: string[]
}

type FilterResult = FilterByValueType<People, string | number>