import { useState, useRef } from 'react'
import { bstInsert } from '../TreeAlgorithms/bstInsert'
import TreeNodeComponent from '../components/TreeNode'
import '../Trees.css'

const treeTypes = {
  bst:     { name: "BST" },
  avl:     { name: "AVL Tree" },
  minheap: { name: "Min Heap" },
  maxheap: { name: "Max Heap" },
}

export default function Trees() {
  const [root, setRoot] = useState(null)
  const [value, setValue] = useState("")
  const [currentTree, setCurrentTree] = useState("bst")
  const [nodeCount, setNodeCount] = useState(0)
  const [lastAction, setLastAction] = useState("Ready")

  function countNodes(node) {
    if (!node) return 0
    return 1 + countNodes(node.left) + countNodes(node.right)
  }

  function treeHeight(node) {
    if (!node) return 0
    return 1 + Math.max(treeHeight(node.left), treeHeight(node.right))
  }

  function assignPositions(node, x, y, offset, nodes = [], edges = []) {
    if (!node) return { nodes, edges }   
    nodes.push({ value: node.value, x, y })
    if (node.left) {
      edges.push({ x1: x, y1: y, x2: x - offset, y2: y + 90 })
      assignPositions(node.left, x - offset, y + 90, offset / 2, nodes, edges)
    }
    if (node.right) {
      edges.push({ x1: x, y1: y, x2: x + offset, y2: y + 90 })
      assignPositions(node.right, x + offset, y + 90, offset / 2, nodes, edges)
    }
    return { nodes, edges }
  }

  const { nodes, edges } = assignPositions(root, 400, 40, 200)
  const height = treeHeight(root)

  function handleInsert() {
    const num = parseInt(value)
    if (isNaN(num)) return            
    const newRoot = bstInsert(root, num)
    setRoot(newRoot)
    setNodeCount(prev => prev + 1)
    setLastAction(`Inserted ${num}`)
    setValue("")
  }

  function handleClear() {
    setRoot(null)
    setNodeCount(0)
    setLastAction("Cleared")
  }

  function handleTreeChange(algo) {
    setCurrentTree(algo)
    setRoot(null)
    setNodeCount(0)
    setLastAction("Reset")
  }

  return (
    <div className="tree-visualizer">

      <div className="control-panel">

        <div className="control-section">
          <div className="section-title">Tree Type</div>
          <div className="algorithm-buttons">
            {Object.entries(treeTypes).map(([key, { name }]) => (
              <button
                key={key}
                className={`algo-btn ${currentTree === key ? "active" : ""}`}
                onClick={() => handleTreeChange(key)}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        <div className="control-section">
          <div className="section-title">Operations</div>
          <div className="action-buttons">
            <input
              className="node-input"
              type="number"
              placeholder="Value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleInsert()}
            />
            <button className="action-btn btn-insert" onClick={handleInsert}>
              Insert
            </button>
            <button className="action-btn btn-clear" onClick={handleClear}>
              Clear
            </button>
          </div>
        </div>

      </div>

      {/* Tree canvas */}
      <div className="tree-canvas-wrapper">
        <svg
          className="tree-svg"
          viewBox={`0 0 800 ${Math.max(300, height * 100 + 60)}`}
        >
          {/* Edges drawn first (behind nodes) */}
          {edges.map((edge, i) => (
            <line
              key={i}
              x1={edge.x1}
              y1={edge.y1}
              x2={edge.x2}
              y2={edge.y2}
              stroke="#64748b"
              strokeWidth="2"
              strokeLinecap="round"   // ✅ was `strokesLinecap`
            />
          ))}

          {/* Nodes */}
          {nodes.map((node, i) => (
            <TreeNodeComponent    // ✅ renamed import to avoid clash with `TreeNode` function name
              key={i}
              value={node.value}
              x={node.x}
              y={node.y}
            />
          ))}

          {!root && (
            <text
              x="400"
              y="150"
              textAnchor="middle"
              style={{ fill: 'var(--color-text-tertiary)', fontSize: '13px' }}
            >
              Insert a value to build the tree
            </text>
          )}
        </svg>
      </div>

      {/* Status bar */}
      <div className="status-bar">
        <div className="status-item">
          <span className="status-label">Tree Type</span>
          <span className="status-value" style={{ color: '#22c55e' }}>
            {treeTypes[currentTree].name}
          </span>
        </div>
        <div className="status-item">
          <span className="status-label">Node Count</span>
          <span className="status-value">{nodeCount}</span>
        </div>
        <div className="status-item">
          <span className="status-label">Tree Height</span>
          <span className="status-value">{height || '-'}</span>
        </div>
        <div className="status-item">
          <span className="status-label">Last Action</span>
          <span className="status-value" style={{ color: '#94a3b8' }}>
            {lastAction}
          </span>
        </div>
      </div>

      {/* Legend */}
      <div className="status-bar" style={{ marginTop: '16px' }}>
        <div className="status-item">
          <span className="status-label">Legend</span>
        </div>
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          {[
            { color: 'linear-gradient(180deg,#334155,#1e293b)', label: 'Node' },
            { color: 'linear-gradient(180deg,#fbbf24,#f59e0b)', label: 'Searching' },
            { color: 'linear-gradient(180deg,#22c55e,#16a34a)', label: 'Found' },
            { color: 'linear-gradient(180deg,#ef4444,#dc2626)', label: 'Deleted' },
          ].map(({ color, label }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: 16, height: 16, borderRadius: '50%', background: color }} />
              <span style={{ color: '#94a3b8', fontSize: '13px' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}