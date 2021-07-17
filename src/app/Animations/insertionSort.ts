export interface Steps {
    state : string,
    index : Array<number>|number |any;
}
const Animation  = <T>(array:T[]):[Array<number>,Array<Steps>]=> {
    let animationarray:Array<Steps>=[];
    // insertionSort([...array],animationarray)
    return [ insertionSort([...array],animationarray),animationarray];
}

const insertionSort= <T>(array: T[], animat:Array<Steps>,cmp: { (a: T, b: T): number } = (a: any, b: any) => a - b):Array<number>=>{
    let current: T; // current is the Marker
    let j: number; //  j sorted array

    // and i is the unsorted part
    for (let i = 1; i < array.length; i += 1) {
        current = array[i]; // set the mark initial mark start from the second element
        animat.push({state:"Pointer", index: i});
        animat.push({state:"unsorted", index:[i]})
        j = i - 1; // j is the end of the sort arr
        // cmp => checks if the elem is greater then the marked elem
        while (j >= 0 && cmp(array[j], current) > 0) {
            array[j + 1] = array[j];
            animat.push({"state":"sorted", "index":[j , j+1]})
            j -= 1;
        }
        array[j + 1] = current; // swap the two values
        animat.push({"state":"unsorted", "index":[i,j+1,Number(current)]})
        }
    return  <number[]><unknown>array
}

export default Animation;