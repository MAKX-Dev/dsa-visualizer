export function mergeSortSteps(inputArray) {
    const arr = [...inputArray];
    const steps = [];
    const n = arr.length;
    helper(arr, 0, n - 1, steps); 
    // Mark all elements as sorted
    for (let i = 0; i < n; i++) {  
        steps.push({
            type: "markSorted",
            index: i,
            array: [...arr]
        });
    }    
    return steps;
}

function helper(arr, low, high, steps) { 
    if (low >= high) return; 
    let mid = Math.floor((low + high) / 2);  
    helper(arr, low, mid, steps);           
    helper(arr, mid + 1, high, steps);     
    merge(arr, low, mid, high, steps);   
}

function merge(arr, low, mid, high, steps) { 
    // Show the range being merged
    steps.push({
        type: "range",
        low: low,        
        high: high,
        array: [...arr]
    });
    // Copy elements from low to mid (inclusive)
    const left = arr.slice(low, mid + 1);  
    // Copy elements from mid+1 to high (inclusive)
    const right = arr.slice(mid + 1, high + 1);   
    let i = 0, j = 0, k = low   
    // Merge the two subarrays
    while (i < left.length && j < right.length) {
        // Compare elements
        steps.push({
            type: "compare",
            i: k,
            j: mid + 1 + j,
            array: [...arr]
        });     
        if (left[i] <= right[j]) {
            arr[k] = left[i];
            steps.push({          
                type: "overwrite",
                index: k,             
                value: left[i],     
                array: [...arr]
            });
            i++;                      
        } else {
            arr[k] = right[j];
            steps.push({              
                type: "overwrite",
                index: k,            
                value: right[j],
                array: [...arr]
            });
            j++;
        }
        k++;
    }   
    // Copy remaining elements from left
    while (i < left.length) {
        arr[k] = left[i];
        steps.push({
            type: "overwrite",
            index: k,
            value: left[i],
            array: [...arr]
        });
        i++;
        k++;
    }   
    // Copy remaining elements from right
    while (j < right.length) {
        arr[k] = right[j];
        steps.push({
            type: "overwrite",
            index: k,
            value: right[j],
            array: [...arr]
        });
        j++;
        k++;
    }
}