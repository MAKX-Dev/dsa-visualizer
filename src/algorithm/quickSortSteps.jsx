// Generate all steps for quick sort visualization (iterative)
export function quickSortSteps(inputArray) {
    const arr = [...inputArray];
    const steps = [];
    const n = arr.length;
    const stack = []
    stack.push({ low: 0, high: n - 1 });   
    while (stack.length > 0) {
        const { low, high } = stack.pop();       
        steps.push({
            type: "range",
            low,
            high,
            arr: [...arr]
        });
        if (low < high) {
            const pivotIndex = partition(arr, low, high, steps);    
            // Mark pivot as sorted
            steps.push({
                type: "markSorted",
                index: pivotIndex,
                array: [...arr]
            });
            if (pivotIndex - 1 > low) {
                stack.push({ low: low, high: pivotIndex - 1 });
            } 
            if (pivotIndex + 1 < high) {
                stack.push({ low: pivotIndex + 1, high: high });
            }
        } 
        else if (low === high) {
            steps.push({
                type: "markSorted",
                index: low,
                array: [...arr]
            });
        }
    }  
    return steps;
}

function partition(arr, low, high, steps) {
    const pivot = arr[high];
    let i = low - 1;   
    // Mark pivot element
    steps.push({
        type: "pivot",
        index: high,
        array: [...arr]
    });  
    for (let j = low; j < high; j++) {
         // Compare current element with pivot
        steps.push({
            type: "compare",
            i: j,
            j: high,
            array: [...arr]
        });      
        if (arr[j] <= pivot) {
            i++;
            if (i !== j) {
                [arr[i], arr[j]] = [arr[j], arr[i]];            
                steps.push({
                    type: "swap",
                    i: i,
                    j: j,
                    array: [...arr]
                });
            }
        }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];   // swapping
    steps.push({
        type: "swap",
        i: i + 1,
        j: high,
        array: [...arr]
    });   
    return i + 1; 
    return steps;
}