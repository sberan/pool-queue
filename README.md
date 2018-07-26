

## Hierarchy

**PoolQueue**

## Index

### Constructors

* [constructor](#constructor)

### Methods

* [drain](#drain)
* [poll](#poll)
* [submit](#submit)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new PoolQueue**(concurrency: *`number`*): [PoolQueue]()

*Defined in index.ts:8*

**Parameters:**

| Param | Type |
| ------ | ------ |
| concurrency | `number` |

**Returns:** [PoolQueue]()

___

## Methods

<a id="drain"></a>

###  drain

▸ **drain**(): `Promise`<`void`>

*Defined in index.ts:38*

Wait until the queue has no more work to complete.

**Returns:** `Promise`<`void`>

___
<a id="poll"></a>

###  poll

▸ **poll**(): `Promise`<`void`>

*Defined in index.ts:31*

Wait until the queue has at least one free worker.

**Returns:** `Promise`<`void`>

___
<a id="submit"></a>

###  submit

▸ **submit**T(work: *`function`*): `Promise`<`T`>

*Defined in index.ts:18*

Submit a task to be completed

**Type parameters:**

#### T 
**Parameters:**

| Param | Type |
| ------ | ------ |
| work | `function` |

**Returns:** `Promise`<`T`>
a Promise containing the completed work. While the task is executed concurrently, the returned Promise is fulfilled serially in the order it was submitted.

___

