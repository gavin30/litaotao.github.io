---
category: erlang
published: true
layout: post
title: 解读 Erlang lists 源码
description: 据说在 Erlang 里，操作lists是最平凡的，那就让我们一起来看看lists是怎么实现的吧~~
---

## 捡下面这些重点的说  
>
**1. 属性说明**    
**2. keyfind/3**  
**3. suffix/2**     
**4. seq/2, seq/3**  
**5. sort/1**
**6. merge/1**  
**7. concat/1**  
**8. flatten/1, flatten/2**  




## 
## 1. 属性说明
　　源文件里注明了 `-compile({no_auto_import, [max/2]}).`，这是一个预定义的模块属性【预定义的模块属性有以下四种：`module，import，export，compile，vsn`】。其中`-compile(Options)`是将Options添加到编译器选项表中，Options可以是单个原子，也可以是一个列表。这里的`no_auto_import`是说函数max/2不要自动从erlang模块里导出了，这是为了解决内置函数冲突。没听明白吧，ok，下面详细讲讲这个。至于模块属性，详见《Erlang程序设计》第二版，8.4节；有关compile选项，请移步[http://erlang.org/doc/man/compile.html](http://erlang.org/doc/man/compile.html)。  
　　首先，什么叫自动导出：easy，自动导出就是你不加模块前缀就可以运行的函数。平常使用模块函数不都是模块名:函数名的吗。比如说我们要使用erlang模块里的max函数，一般都是erlang:max这样使用。so，顾名思义，如果max函数在erlang里是自动导出的，那我猜想我们可以直接在console里运行max函数了，而且注意，在console里不加模块名直接运行的max函数一定是定义在erlang这个模块里面的。猜想一下，如果含有其他模块【假定为erl】也定义了一个max函数，并且也自动导出了，那当你直接运行max函数时，erlang虚拟机是该运行erl里的max呢还是erlang里的max呢。  
　　好的，简单测试下，直接看代码得了:  

```
root@kali:~/Desktop/erlcode# erl
Erlang/OTP 17 [erts-6.1] [source] [64-bit] [smp:4:4] [async-threads:10] [hipe] [kernel-poll:false]

Eshell V6.1  (abort with ^G)
1> erlang:max(1,2).
2
2> max(1,2).
2
3>
```  
　　现在，这个问题解决了，那我们来看看，为什么在lists模块里要阻止max/2自动导入呢。just think it，就和我上面说的一样，防止自动导出的核心是什么？不就是为了防止函数冲突吗？so，我猜想我们lists.erl模块里也有一个max/2函数，而且这个max/2函数的实现必须是和erlang模块里的实现是不同的。CTRL+F查找，果然不出所料：　　

```
%% max(L) -> returns the maximum element of the list L

-spec max(List) -> Max when
      List :: [T,...],
      Max :: T,
      T :: term().

max([H|T]) -> max(T, H).

max([H|T], Max) when H > Max -> max(T, H);
max([_|T], Max)              -> max(T, Max);
max([],    Max)              -> Max.
```  
　　好了，到这里关于模块预定义属性就差不多了，以后遇到了再慢慢补上。

## 2. keyfind/3  
 　　lists里的`keyfind/3, keymember/3, keysearch/3, member/2, reverse/2`都是通过内置函数实现的，源码都在erl_bif_types.erl这个文件里面。在keyfind/3的定义中，看到了pos_integer()这样一个变量类型，看来基础还是不行啊，没办法，大家有空都来这里补补基础吧。[7 Types and Function Specifications](http://www.erlang.org/doc/reference_manual/typespec.html)  

## 3. suffix/2  
　　之所以要介绍suffix，是想借suffix来简单介绍一下Erlang里的布尔表达式和所谓的短路布尔表达式。函数定义和实现如下，检查Suffix是否是List的后缀。实现就用了两行，真是精湛啊，突然发现其实很多操作不用循环也能很清楚的表达了。  
　　这里的 andalso 叫做短路布尔表达式，其含义是指 `Expr1 andalso Expr2` 这样一个表达式只有在Expr1为真的情况下才会执行Expr2。同样可以理解一下orelse这个短路布尔表达式。而普通的布尔表达式和其他语言里一样的，not, and, or, xor。  

```  
%% suffix(Suffix, List) -> (true | false)

-spec suffix(List1, List2) -> boolean() when
      List1 :: [T],
      List2 :: [T],
      T :: term().

suffix(Suffix, List) ->
    Delta = length(List) - length(Suffix),
    Delta >= 0 andalso nthtail(Delta, List) =:= Suffix.
```  

## 4. seq/2  
　　seq/2是一个高级接口，调用了一个三参数的接口`seq_loop(N, X, L)`，如下，其中N=Last-First+1，是需要生成的长度，X=Last，是最后一个元素的值，L是一个空列表[]，将结果保存到第三个参数L中，最后再返回它。而生成这个列表的方法确实很高效，要么一次生成4个数，要么一次生成2个数，要么生成一个数或者直接返回结果。而实际应用中，大多数情况应该都是一次生成4个数，然后可能会调用1到2次一次生成2个数，最后要么直接返回结果，要么就再生成1个数后再返回结果。极为高效！我又想起了Python里相似的range函数，过两天看看Python里是怎么实现的。  

```
-spec seq(From, To) -> Seq when
      From :: integer(),
      To :: integer(),
      Seq :: [integer()].

seq(First, Last)
    when is_integer(First), is_integer(Last), First-1 =< Last ->
    seq_loop(Last-First+1, Last, []).

seq_loop(N, X, L) when N >= 4 ->
     seq_loop(N-4, X-4, [X-3,X-2,X-1,X|L]);
seq_loop(N, X, L) when N >= 2 ->
     seq_loop(N-2, X-2, [X-1,X|L]);
seq_loop(1, X, L) ->
     [X|L];
seq_loop(0, _, L) ->
     L.
```  
## 5. sort/1  
　　sort函数是必须要学习学习的拉，第一次看到sort的源码确实是lists里挺长的了，好了，来分析分析。  

```
-spec sort(List1) -> List2 when
      List1 :: [T],
      List2 :: [T],
      T :: term().

sort([X, Y | L] = L0) when X =< Y ->
    case L of
  [] -> 
      L0;
  [Z] when Y =< Z ->
      L0;
  [Z] when X =< Z ->
      [X, Z, Y];
  [Z] ->
      [Z, X, Y];
  _ when X == Y ->
      sort_1(Y, L, [X]);
  _ ->
      split_1(X, Y, L, [], [])
    end;
sort([X, Y | L]) ->
    case L of
  [] ->
      [Y, X];
  [Z] when X =< Z ->
      [Y, X | L];
  [Z] when Y =< Z ->
      [Y, Z, X];
  [Z] ->
      [Z, Y, X];
  _ ->
      split_2(X, Y, L, [], [])
    end;
sort([_] = L) ->
    L;
sort([] = L) ->
    L.

sort_1(X, [Y | L], R) when X == Y ->
    sort_1(Y, L, [X | R]);
sort_1(X, [Y | L], R) when X < Y ->
    split_1(X, Y, L, R, []);
sort_1(X, [Y | L], R) ->
    split_2(X, Y, L, R, []);
sort_1(X, [], R) ->
    lists:reverse(R, [X]).

%% sort/1

%% Ascending.
split_1(X, Y, [Z | L], R, Rs) when Z >= Y ->
    split_1(Y, Z, L, [X | R], Rs);
split_1(X, Y, [Z | L], R, Rs) when Z >= X ->
    split_1(Z, Y, L, [X | R], Rs);
split_1(X, Y, [Z | L], [], Rs) ->
    split_1(X, Y, L, [Z], Rs);
split_1(X, Y, [Z | L], R, Rs) ->
    split_1_1(X, Y, L, R, Rs, Z);
split_1(X, Y, [], R, Rs) ->
    rmergel([[Y, X | R] | Rs], []).

split_1_1(X, Y, [Z | L], R, Rs, S) when Z >= Y ->
    split_1_1(Y, Z, L, [X | R], Rs, S);
split_1_1(X, Y, [Z | L], R, Rs, S) when Z >= X ->
    split_1_1(Z, Y, L, [X | R], Rs, S);
split_1_1(X, Y, [Z | L], R, Rs, S) when S =< Z ->
    split_1(S, Z, L, [], [[Y, X | R] | Rs]);
split_1_1(X, Y, [Z | L], R, Rs, S) ->
    split_1(Z, S, L, [], [[Y, X | R] | Rs]);
split_1_1(X, Y, [], R, Rs, S) ->
    rmergel([[S], [Y, X | R] | Rs], []).

%% Descending.
split_2(X, Y, [Z | L], R, Rs) when Z =< Y ->
    split_2(Y, Z, L, [X | R], Rs);
split_2(X, Y, [Z | L], R, Rs) when Z =< X ->
    split_2(Z, Y, L, [X | R], Rs);
split_2(X, Y, [Z | L], [], Rs) ->
    split_2(X, Y, L, [Z], Rs);
split_2(X, Y, [Z | L], R, Rs) ->
    split_2_1(X, Y, L, R, Rs, Z);
split_2(X, Y, [], R, Rs) ->
    mergel([[Y, X | R] | Rs], []).

split_2_1(X, Y, [Z | L], R, Rs, S) when Z =< Y ->
    split_2_1(Y, Z, L, [X | R], Rs, S);
split_2_1(X, Y, [Z | L], R, Rs, S) when Z =< X ->
    split_2_1(Z, Y, L, [X | R], Rs, S);
split_2_1(X, Y, [Z | L], R, Rs, S) when S > Z ->
    split_2(S, Z, L, [], [[Y, X | R] | Rs]);
split_2_1(X, Y, [Z | L], R, Rs, S) ->
    split_2(Z, S, L, [], [[Y, X | R] | Rs]);
split_2_1(X, Y, [], R, Rs, S) ->
    mergel([[S], [Y, X | R] | Rs], []).  
```  





