import { useNavigate } from "react-router-dom";
export default function Home() {
    const navigate = useNavigate();
    return(
        <div className="page">
            <h1>DSA Visualizer</h1>
            <p>Learn algorithms visually.</p>
            <button onClick={()=> navigate("/sorting")}>Go to sorting</button>
            <button onClick={()=> navigate("/searching")}>Go to searching</button>
        </div>
    );
}