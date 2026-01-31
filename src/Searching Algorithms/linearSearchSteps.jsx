export function linearSearchSteps(inputArray, target) {
    const arr = [...inputArray];
    const steps = [];
    const n = arr.length;
    for (let i = 0; i < n; i++) {
        steps.push({
            type: 'compare',
            index: i,
            array: [...arr]  
        });
        if (arr[i] === target) {
            steps.push({
                type: "target",
                index: i,
                array: [...arr]  
            });
            return steps;
        }
    }

    steps.push({
        type: "not_found", 
        index: -1,
        array: [...arr]  
    });
    return steps;
}