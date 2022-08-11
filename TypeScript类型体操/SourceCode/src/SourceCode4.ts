// 数组长度做计算


// 做加法

// Add
type Add<Num1 extends number, Num2 extends number> = 
    [...BuildArray<Num1>,...BuildArray<Num2>]['length'];

type AddResult = Add<32, 25>; 


// Subtract

type Subtract<Num1 extends number, Num2 extends number> = 
    BuildArray<Num1> extends [...arr1: BuildArray<Num2>, ...arr2: infer Rest]
        ? Rest['length']
        : never;

type SubtractResult = Subtract<33, 12>;

// Mutiply

type Mutiply<
    Num1 extends number,
    Num2 extends number,
    ResultArr extends unknown[] = []
> = Num2 extends 0 ? ResultArr['length']
        : Mutiply<Num1, Subtract<Num2, 1>, [...BuildArray<Num1>, ...ResultArr]>;

type MutiplyResult = Mutiply<3, 222>;

// Divide 

type Divide<
    Num1 extends number,
    Num2 extends number,
    CountArr extends unknown[] = []
> = Num1 extends 0 ? CountArr['length']
        : Divide<Subtract<Num1, Num2>, Num2, [unknown, ...CountArr]>;

type DivideResult = Divide<30, 5>;


// StrLen

type StrLen<
    Str extends string,
    CountArr extends unknown[] = []
> = Str extends `${string}${infer Rest}` 
    ? StrLen<Rest, [...CountArr, unknown]> 
    : CountArr['length'];

type StrLenResult = StrLen<"Hello World">;

