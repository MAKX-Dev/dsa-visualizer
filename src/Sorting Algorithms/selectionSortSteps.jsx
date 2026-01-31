// Generate all steps for selection sort visualization
export function selectionSortSteps(inputArray) {
    const arr = [...inputArray]
    const steps = []
    const n = arr.length   
    for(let i = 0; i < n - 1; i++) {
        let minIndex = i;     
        for(let j = i + 1; j < n; j++) {
            // Record comparison step
            steps.push({
                type:"compare",
                i:j,
                j:minIndex,
                array: [...arr]
            });     
            // Update minIndex if smaller element found
            if(arr[j] < arr[minIndex]) {
                minIndex = j;
                steps.push({
                    type:"selectMin",
                    index:minIndex,
                    array: [...arr]
                });
            }
        }       
        if(minIndex !== i) {
            let temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;          
            // Record swap step
            steps.push({
                type:"swap",
                i:i,
                j:minIndex,
                array: [...arr]
            });  
        }     
        // Mark current position as sorted after each pass
        steps.push({
            type:"markSorted",
            index:i,
            array: [...arr]
        });
    }       
    return steps;      
}