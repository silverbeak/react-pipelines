import styled from 'styled-components'

interface ConnectionContainerProps {
  key: string
  lines: ConnectionSvgLineProps[]
  onLineRightClick: (lineKey: string, event: React.MouseEvent) => void;
}

const StyledSvgContainer = styled.svg`
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 0;
  color: red;

  fill: none;
  stroke: steelblue;
  pointer-events: all;
`

const StyledSvgLine = styled.line`
  position: absolute;
  stroke-width: 2px;
  transition: stroke-width 0.2s ease;
  &:hover {
    stroke: red;
    stroke-width: 6px;
    cursor: pointer;
`

// const StyledSvgPath = styled.path`
//   position: absolute;
//   strokeWidth: 2px;
//   &:hover {
//     stroke: red;
//   }
// `

interface ConnectionSvgLineProps extends React.SVGProps<SVGLineElement> {
  key: string
}

const ConnectionCanvas = (props: ConnectionContainerProps) => {
  return (
    <StyledSvgContainer>
      {/* <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" />
        </marker>
      </defs> */}
      {props.lines.map((line) => (
        <StyledSvgLine
          id={line.key}
          key={line.key}
          x1={line.x1}
          y1={line.y1}
          x2={line.x2}
          y2={line.y2}
          stroke="steelblue"
          strokeWidth="2"
          onContextMenu={(event) => props.onLineRightClick(line.key, event)}
          // markerEnd="url(#arrowhead)"
        />
      ))}

      {/* Styled Path with Curvature / Arc
      <StyledSvgPath
        // d="M 100 350 q 150 -300 300 0"
        d="M 130 110 C 120 140, 180 140, 170 110"
        stroke="steelblue"
        strokeWidth="2"
        fill="none"
        markerEnd="url(#arrowhead)"
      /> */}
    </StyledSvgContainer>
  )
}

export { ConnectionCanvas, type ConnectionSvgLineProps, type ConnectionContainerProps }
