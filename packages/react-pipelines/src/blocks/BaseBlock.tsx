import styled from 'styled-components'

interface TransformData {
  translateX?: number
  translateY?: number
}

const BaseBlock = styled.div<{ $transformData?: TransformData }>`
  animation: 0.5s both running moveto;
  background-color: #000;
  position: absolute;
  transform: translate(
    ${(props) => props.$transformData?.translateX || 0}px,
    ${(props) => props.$transformData?.translateY || 0}px
  );
  color: #fff;
  border-radius: 2px;
  border: 1px solid #eee;
  padding: 10px;
  margin: 0;
  width: 200px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

export default BaseBlock
