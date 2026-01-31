// Generate all steps for insertion sort visualization
export function insertionSortSteps(inputArray) {
    const arr = [...inputArray];
    const steps = []; // Store all sorting steps
    const n = arr.length;  
    for(let i = 0; i < n; i++) {
        let j = i;     
        while(j > 0 && arr[j-1] > arr[j]) {
            // Record comparison step
            steps.push({
                type: "compare",
                i: j,
                j: j - 1,
                array: [...arr] // Snapshot of array at this step
            });       
            
            // Swap arr[j] and arr[j-1]
            let temp = arr[j];
            arr[j] = arr[j - 1];
            arr[j - 1] = temp;
            
            // Record swap step BEFORE decrementing j
            steps.push({
                type: "swap",
                i: j,
                j: j - 1,
                array: [...arr] // Snapshot after swap
            });
            
            j--;
        }     
        // Mark elements as sorted after each pass
        steps.push({
            type: "markSorted",
            index: i,
            array: [...arr]
        });
    }
    
    return steps; // Return all steps for visualization
}