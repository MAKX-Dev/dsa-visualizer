// Generate all steps for bubble sort visualization
export function bubbleSortSteps(inputArray) {
    // Create a copy of input array to avoid mutating original
    const arr = [...inputArray]
    const steps=[]; // Store all sorting steps
    const n = arr.length; 
    // Outer loop: reduces the range of unsorted elements after each pass
    for(let i = n - 1; i >= 1; i--){
        // Inner loop: compare adjacent elements and swap if needed
        for(let j = 0; j < i; j++) {
           // Record comparison step
           steps.push({
            type:"compare",
            i:j,
            j:j+1,
            array: [...arr] // Snapshot of array at this step
           });        
           // Swap if left element is greater than right element
           if(arr[j]>arr[j+1]) {
                const temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;               
                // Record swap step after swapping
                steps.push({
            type:"swap",
            i:j,
            j:j+1,
            array: [...arr] // Snapshot after swap
           });  
        }
    } 
    // Mark elements as sorted after each pass
    steps.push({
            type:"markSorted",
            index:i,
            array: [...arr]
           });
    } 
    // Mark the first element as sorted (final step)
    steps.push({
            type:"markSorted",
            index:0,
            array: [...arr]
           });          
    return steps; // Return all steps for visualization
}