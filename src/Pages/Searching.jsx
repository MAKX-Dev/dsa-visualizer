import { useState, useRef, useEffect } from 'react'
import { linearSearchSteps } from '../Searching Algorithms/linearSearchSteps'
import { ALGO_STATE } from '../constants/ALGO_STATE'

const algorithms = {
  linear:{
    name : "Linear Search",
    steps: linearSearchSteps
  }
}

export default function Searching() {
  // State management for the visualizer
  const [array, setArray] = useState([])  
  const [steps, setSteps] = useState([]) 
  const [currentStep, setCurrentStep] = useState(0) 
  const [speed, setSpeed] = useState(500)
  const [algoState, setAlgostate] = useState(ALGO_STATE.IDLE)
  const [currentAlgorithm, setCurrentAlgorithm] = useState("linear")
  const [target, setTarget] = useState(3) // Add target state
  const intervalRef = useRef(null)
  // Initialize array and generate sorting steps
   function generateArray() {
    if(algoState === ALGO_STATE.RUNNING) {
      alert("Pause or reset the algorithm first")
      return;
    }
    let list = [5, 3, 5, 1, 3, 8, 5]
    setArray(list);   
    const algorithm = algorithms[currentAlgorithm]
    const sortSteps = algorithm.steps(list, target); // Pass target here!
    setSteps(sortSteps)
    setCurrentStep(0)
    setAlgostate(ALGO_STATE.IDLE);
  }

  // Handle speed slider change
  function onSliderChange(e) {
    setSpeed(Number(e.target.value))
  }

  // Determine which array to render
  const renderArray = steps.length > 0 && currentStep < steps.length 
    ? steps[currentStep].array 
    : array;
  
 function getBarColor(index) {
  if (steps.length === 0) return 'blue';
  const step = steps[currentStep];
  if (!step) return 'blue';
  if (step.type === 'not_found') return 'red';
  if (step.type === 'target' && step.index === index) return 'green';
  if (step.type === 'compare' && step.index === index) return 'yellow';
  return 'blue';
}

  // Auto play effect core logic
  useEffect(() => {
    if(steps.length === 0) return; 
    if (algoState !== ALGO_STATE.RUNNING) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if(currentStep >= steps.length - 1) {
        setAlgostate(ALGO_STATE.COMPLETED);
        clearInterval(intervalRef.current);
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length) {
          clearInterval(intervalRef.current);
          setAlgostate(ALGO_STATE.COMPLETED);
          return prev;
        }
        return prev + 1;
      });
    }, speed);

    return () => clearInterval(intervalRef.current);
  }, [algoState, speed, steps.length]);

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
    setAlgostate(ALGO_STATE.RUNNING);
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
    <div className="page">
      <div className="sorting-visualizer">
        <h1>DSA Sorting Visualizer</h1>      
        {/* Add target input field */}
        <div className="controls">
          <label>Target Value: </label>
          <input
            type="number" 
            value={target}
            // onChange={(e) => setTarget(Number(e.target.value))}
            disabled={algoState === ALGO_STATE.RUNNING}
          />
        </div>

        {/* Algorithm Selection */}
        <div className="algorithm-selection">
          <button 
            onClick={() => handleAlgorithmChange("linear")}
            className={currentAlgorithm === "linear" ? "btn active" : "btn"}
            disabled={currentAlgorithm === "linear"}
          >
            Linear Search
          </button>

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
        <div className="control-buttons">
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
        </div>

        {/* Legend */}
        <div className="legend">
          <div className="legend-item">
            <span className="legend-color" style={{backgroundColor: 'yellow'}}></span>
            <span>Comparing</span>
          </div>
          <div className="legend-item">
            <span className="legend-color" style={{backgroundColor: 'red'}}></span>
            <span>Swapping</span>
          </div>
          <div className="legend-item">
            <span className="legend-color" style={{backgroundColor: 'orange'}}></span>
            <span>Overwriting</span>
          </div>
          <div className="legend-item">
            <span className="legend-color" style={{backgroundColor: 'purple'}}></span>
            <span>Pivot</span>
          </div>
          <div className="legend-item">
            <span className="legend-color" style={{backgroundColor: 'green'}}></span>
            <span>Sorted</span>
          </div>
        </div>
      </div>
    </div>
   </div>
  );
}