function TreeNodeRecursive({node}) {
    if(!node) return null;
    return (
        <>
        <div className="tree-container">
            {node.value}
        </div>
        <TreeNode node = {node.left}/>
        <TreeNode node = {node.right}/>
        </>
    )
}
// components/TreeNode.jsx
export default function TreeNode({ value, x, y }) {
  return (
    <g>
      <circle
        cx={x}
        cy={y}
        r={22}
        fill="#1e293b"
        stroke="#334155"
        strokeWidth={1.5}
      />
      <text
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="central"
        fill="#f8fafc"
        fontSize={13}
        fontWeight={500}
      >
        {value}
      </text>
    </g>
  )
}