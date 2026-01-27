import { useState, useRef, useEffect } from 'react'
import './App.css'
import { bubbleSortSteps } from "./algorithm/bubbleSortSteps"
import { selectionSortSteps } from "./algorithm/selectionSortSteps"
import { ALGO_STATE } from './ALGO_STATE'

const algorithms = {
  bubble: {
    name: "Bubble Sort",
    steps: bubbleSortSteps
  },
  selection: {
    name: "Selection Sort",
    steps: selectionSortSteps
  }
}


function App() {
  // State management for the visualizer
  const [array, setArray] = useState([])  
  const [steps, setSteps] = useState([]) 
  const [currentStep, setCurrentStep] = useState(0) 
  const [speed, setSpeed] = useState(500)
  const [algoState, setAlgostate] = useState(ALGO_STATE.IDLE)
  const [currentAlgorithm, setCurrentAlgorithm] = useState("bubble")
  const intervalRef = useRef(null)
  
  // Initialize array and generate sorting steps
  function generateArray() {
    if(algoState === ALGO_STATE.RUNNING) {
      alert("Pause or reset the algorithm first")
      return;
    }
    let list = [5,3,1,10,8,19,15,23]
    setArray(list);   
    // Use algorithm map to get the correct function
    const algorithm = algorithms[currentAlgorithm]
    const sortSteps = algorithm.steps(list);
    // Choose algorithm based on currentAlgorithm state
    setSteps(sortSteps)
    setCurrentStep(0)
    setAlgostate(ALGO_STATE.IDLE);
  }

  // Move to the next sorting step
  function nextStep() {
   if(algoState !== ALGO_STATE.RUNNING) return;
   if(currentStep >= steps.length){
    clearInterval(intervalRef.current)
    setAlgostate(ALGO_STATE.COMPLETED);
    return;
   }
   setCurrentStep((prev) => prev + 1);
  }

  // Handle speed slider change
  function onSliderChange(e) {
    setSpeed(Number(e.target.value))
  }

  // Determine which array to render
  let renderArray = array;
  if(steps.length > 0 && steps[currentStep]) {
    renderArray = steps[currentStep].array;
  }

  // Determine bar color based on current step type and index
  function getBarColor(index) {
    if (steps.length === 0) return 'blue';
    const step = steps[currentStep];
    if (!step) return 'blue';   
    let active = []; 
    if (step.type === "compare" || step.type === "swap") {
      active = [step.i, step.j];
    } else if (step.type === "markSorted") {
      active = [step.index];
    }       
    if (active.includes(index)) {
      if (step.type === "compare") return 'yellow';
      if (step.type === "swap") return 'red';
      if (step.type === "markSorted") return 'green';
    }
    return 'blue';
  }

  // Auto play effect core logic
  useEffect(()=>{
    if(algoState !== ALGO_STATE.RUNNING) return;
    intervalRef.current = setInterval(nextStep, speed);
    return()=> clearInterval(intervalRef.current);
  }, [algoState, currentStep, speed, steps.length])

  function handlePlayPause() {
    if(algoState === ALGO_STATE.IDLE || algoState === ALGO_STATE.PAUSED) {
      setAlgostate(ALGO_STATE.RUNNING);
    }
    else if(algoState === ALGO_STATE.RUNNING) {
      setAlgostate(ALGO_STATE.PAUSED);
    }
    else if(algoState === ALGO_STATE.COMPLETED) {
      setCurrentStep(0);
      setAlgostate(ALGO_STATE.RUNNING);
    }
  }

  function handleNextStep() {
    if(algoState !== ALGO_STATE.PAUSED) {
      alert("Pause the algorithm first");
      return;
    }
    if(currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    }
  }

  function handleReset() {
    clearInterval(intervalRef.current);
    setCurrentStep(0);
    setAlgostate(ALGO_STATE.IDLE);
  }

  function handleAlgorithmChange(algo) {
    if(algoState === ALGO_STATE.RUNNING) {
      alert("Algorithm is running");
      return;
    }
    setCurrentAlgorithm(algo);
    handleReset();
  }

  // Get button label based on current state
  function getButtonLabel() {
    if (algoState === ALGO_STATE.RUNNING) return "Pause"
    if (algoState === ALGO_STATE.PAUSED) return "Resume"
    if (algoState === ALGO_STATE.COMPLETED) return "Restart"
    return "Play"
  }

  return (
    <>
      <div>Welcome to dsa visualizer</div>   
      {/* Algorithm Selection */}
      <div className="algorithm-selection">
        <button 
          onClick={() => handleAlgorithmChange("bubble")}
          className={currentAlgorithm === "bubble" ? "btn active" : "btn"}
          disabled={currentAlgorithm === "bubble"}
        >
          Bubble Sort
        </button>
        <button 
          onClick={() => handleAlgorithmChange("selection")}
          className={currentAlgorithm === "selection" ? "btn active" : "btn"}
          disabled={currentAlgorithm === "selection"}
        >
          Selection Sort
        </button>
      </div>
      {/* Speed Slider */}
      <div className="controls">
        <label>Speed: {speed}ms</label>
        <input 
          type="range" 
          min="100" 
          max="1000" 
          step="50"
          value={speed}
          onChange={onSliderChange}
        />
      </div>
      {/* Container for rendering array bars */}
      <div className="container">
        {renderArray.map((value, index) => (  
          <div 
            key={index} 
            className="bar"
            style={{
              height: `${value * 20}px`,
              width: '30px', 
              backgroundColor: getBarColor(index),
              borderRadius: 7
            }}
          >
          </div>
        ))}
      </div>
      {/* Control buttons */}
      <button onClick={generateArray} className='btn'>
        Generate Array
      </button>
      <button onClick={handlePlayPause} className='btn'>
        {getButtonLabel()}
      </button>
      <button onClick={handleNextStep} disabled={algoState !== ALGO_STATE.PAUSED} className='btn'>
        Next Step
      </button> 
      <button onClick={handleReset} className='btn'>
        Reset
      </button> 
    </>
  )
}
export default App;