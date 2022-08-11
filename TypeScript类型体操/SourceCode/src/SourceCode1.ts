
// 数组类型

// First
// 获取数组的第一个值

type GetFirst<Arr extends unknown[]> = 
    Arr extends [infer First, ...unknown[]] ? First : never;

type GetFirstResult = GetFirst<[1,2,3]>


// Last
// 获取数组的最后一个值

type GetLast<Arr extends unknown[]> = 
    Arr extends [...unknown[], infer Last] ? Last : never;

type GetLastResult = GetLast<[1,2,3]>

// PopArr
// 实现数组的 pop
type PopArr<Arr extends unknown[]> = 
    Arr extends [] ? [] 
        : Arr extends [...infer Rest, unknown] ? Rest : never;

type PopResult = PopArr<[1,2,3]>;

// ShiftArr

type ShiftArr<Arr extends unknown[]> = 
    Arr extends [] ? [] 
        : Arr extends [unknown, ...infer Rest] ? Rest : never;

type ShiftResult = ShiftArr<[1,2,3]>;


// 字符串类型


// StartsWith
// 判断字符串 是否是 以 xx 开头

type StartsWith<Str extends string, Prefix extends string> = 
    Str extends `${Prefix}${string}` ? true : false;

type StartsWithResult = StartsWith<'hello world', 'hello'>;

type StartsWithResult2 = StartsWith<'hello world', 'world'>;


// Replace
// 字符串替换

type ReplaceStr<
    Str extends string,
    From extends string,
    To extends string
> = Str extends `${infer Prefix}${From}${infer Suffix}` 
        ? `${Prefix}${To}${Suffix}` : Str;

type ReplaceResult = ReplaceStr<'this is a dog or ?','?', 'finsh'>;

// Trim
type TrimStrRight<Str extends string> = 
    Str extends `${infer Rest}${' ' | '\n' | '\t'}` 
        ? TrimStrRight<Rest> : Str;


type TrimRightResult = TrimStrRight<'hello     '>

type TrimStrLeft<Str extends string> = 
    Str extends `${' ' | '\n' | '\t'}${infer Rest}` 
        ? TrimStrLeft<Rest> : Str;


type TrimLeftResult = TrimStrLeft<'    hello'>


// 函数


// GetReturnType

type GetReturnType<Func extends Function> = 
    Func extends (...args: any[]) => infer ReturnType 
        ? ReturnType : never;

type ReturnTypeResullt = GetReturnType<() => 'single dog'>


// 构造器

// GetInstanceType


interface Person {
  name: string;
}

interface PersonConstructor {
  new(name: string): Person;
}


type GetInstanceType<
    ConstructorType extends new (...args: any) => any
> = ConstructorType extends new (...args: any) => infer InstanceType 
        ? InstanceType 
        : any;

type GetInstanceTypeResult = GetInstanceType<PersonConstructor>


// GetConstructorParameters

type GetConstructorParameters<
    ConstructorType extends new (...args: any) => any
> = ConstructorType extends new (...args: infer ParametersType) => any
    ? ParametersType
    : never;

type GetConstructorParametersResult = GetConstructorParameters<PersonConstructor>


// 索引类型

// GetRefProps

type GetRefProps<Props> = 
    'ref' extends keyof Props
        ? Props extends { ref?: infer Value | undefined}
            ? Value
            : never
        : never;

type GetRefPropsResult = GetRefProps<{ ref: 'hello' }>







