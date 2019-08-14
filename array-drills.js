// Some questions answered in commented out lines below

const memory = require('./memory.js');
// 1. Implement an Array class from scratch.
let Memory = new memory();

class Array {
    constructor() {
        this.length = 0;
        this._capacity = 0;

        this.ptr = Memory.allocate(this.length);
    }

    push(value) {
        if (this.length >= this._capacity) {
            this._resize((this.length + 1) * Array.SIZE_RATIO);
        }

        Memory.set(this.ptr + this.length, value);
        this.length++;
    }

    _resize(size) {
        const oldPtr = this.ptr;
        this.ptr = Memory.allocate(size);
        if (this.ptr === null) {
            throw new Error('Out of Memory');
        }
        Memory.copy(this.ptr, oldPtr, this.length);
        Memory.free(oldPtr);
        this._capacity = size;
    }
    get(index) {
        if (index < 0 || index >= this.length) {
            throw new Error('Index error');
        }
        return Memory.get(this.ptr + index);
    }
    pop() {
        if (this.length === 0) {
            throw new Error('Index error');
        }
        const value = Memory.get(this.ptr + this.length - 1);
        this.length--;
        return value;
    }
    remove(index) {
        if (index < 0 || index >= this.length) {
            throw new Error('Index error');
        }
        Memory.copy(
            this.ptr + index,
            this.ptr + index + 1,
            this.length - index - 1
        );
        this.length--;
    }
}

// 2. What is the length, capacity and memory address of your array?
// Array { length: 1, _capacity: 3, ptr: 0 }


// What is the length, capacity and memory address of your array? Explain the result of your program after adding the new lines of code.

// Array { length: 6, _capacity: 12, ptr: 3 }
//Started with a length and capacity of 0. After adding 1 to length, the conditional is put inside the push function to change the capacity to (this.length + 1) * ARR.SIZE_RATIO = (0 + 1) * 3 = 3. And then  the conditional added again after adding a third element. Then the capacity changes from 6 to (3 + 1) * 3 = 12.


// 3. What is the length, capacity, and address of your array? Explain the result of your program after adding the new lines of code.
// Array { length: 9, _capacity: 12, ptr: 3 }. 

//Length decreased from 12 to 9 because it was 'pop'ped with 3 elements , deleting the last three elements that had been pushed.  Capacity and pointer stay unchanged.
