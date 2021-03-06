***
layout: main
mathjax: true
title: Sequential Collections
description: API and performance information for Imms sequential collections.
styles:
  - documentation.css

***
# Sequential
This page talks about operations common to the sequential collections, such as [`ImmList`](T:ImmList'1), which is the primary collection of this kind.

## Kinds of collections
Imms offers two sequential collections:

1. ### ImmList,
	The primary sequential collection. Supports a wide variety of operations very efficiently. See the table below.
	
2. ### ImmVector
	Another sequential collection. Supports fewer operations, but can perform much better in some situations, on par with mutable collections.
	
	This collection works well, but probably requires some optimization and redesign to be more useful. It's recommend you use `ImmList` for now, as its benefits outweigh its drawbacks.
	

## Kinds of Operations
Note that all index parameters may be negative, indicating position from the end.

### Access to the ends
Access to the ends of a collection is supported by methods such as [`AddLast`](M:ImmList'1.AddLast), [`AddFirst`](M:ImmList'1.AddFirst), [`RemoveLast`](M:ImmList'1.RemoveLast) and [`RemoveFirst`](M:ImmList'1.RemoveFirst).

```csharp
var list = ImmList.Of(1, 2, 3);
list =
    list.AddLast(4).AddFirst(0).RemoveLast().RemoveFirst()
```

These methods have variants such as [`AddLastRange`](M:ImmList'1.AddLastRange) that add multiple items to one end or concatenate another list to the end of this one.

`AddLastRange` performs type checking to detect the input collection and optimize accordingly. If the collection supports concatenation, then concatenation is used.

The `+` operator can be also be used, and acts as a synonym to these methods. For example, the following two lines are identical:

```csharp
//using methods:
immList = immList.AddLast(4).AddFirstRange(new[] {1, 2, 3}).AddLastRange(immList2);

//using operators:
immList = new[] {1, 2, 3} + immList + 4 + immList2;
```

### Access by index
Sequential collections support access by index. Several forms of access are supported:

0. #### Lookup by index
	Use the indexer [`this[int index]`](P:AbstractSequential'2.Item(Int32)) to lookup the item at position `index`.

1. #### Update by index
	Use the [`Update(int index, T value)`](M:ImmList'1.Update) method to set the item at position `index` to `value`.

2. #### Insert at index
	Use [`Insert(int index, T value)`](M:ImmList'1.Insert) method to insert `value` at position `index`, moving all proceeding elements forward. `InsertRange` may also be used.
	
	Inserting at position `Length` is the same as `AddLast` (i.e. adds elements to the end of the collection).
	
3. #### Remove at index
	Use [`RemoveAt(int index)`](M:ImmList'1.RemoveAt) method to remove the item at position `index`, moving all proceeding elements backward.

### Subsequences
Sequential collections support subsequences or slices. You can use the indexer [`this[int start, int end]`](P:AbstractSequential'2.Item(Int32,Int32)) to return a slice of the collection starting with `start` and ending with `end`.

[`Take`](M:AbstractSequential'2.Take) and [`Skip`](M:AbstractSequential'2.Skip) may also be used. [`TakeWhile`](M:AbstractSequential'2.TakeWhile) and [`SkipWhile`](M:AbstractSequential'2.SkipWhile) have been optimized to use collection slices.

## Performance and Complexity
Imms collections have been turned for extremely high performance and have many optimizations for bulk operations (adding or removing many items at the same time) that allow them to sidestep the overhead imposed by immutability in these circumstances.

Similar optimizations will enable creating high-performance mutable collection builders in the future.

### Complexity
The computational complexity of Imms sequential collections and comparable non-Imms collections can be seen below.
<div data-component="CmComplexityTable" data-props-table="sequentials">--[COMPLEXITY TABLE]--</div>

### Performance
The collections have been put through thorough benchmarking and compared against similar collections from other libraries. These results are from one benchmarking session, with a specific number of iterations and other parameters. However, the parameters between different tests and test groups are comparable.

For example, the `AddLast` benchmark might've been executed for 100,000 iterations, while the `AddLastRange` benchmark might've been executed with input datasets of 10,000 elements 10 times.

<div data-component="CmChartSuite" data-props-suite="sequentials">--[PERFORMANCE CHARTS]--</div>