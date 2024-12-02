import styled from 'styled-components'

const styledConnectionPoint = styled.div`
  position: absolute;
  width: 15px;
  height: 15px;
  background: white;
  border-radius: 50%;
  cursor: grab;
  border: 1px solid black;
  z-index: 10;
  margin-bottom: 5px;

  &:active {
  cursor: grabbing;
  border-color: lightblue;
  }
`

const styledInputConnectionPoint = styled(styledConnectionPoint)`
  left: -10px;
  top: 40px;
  background: green;
`

const styledErrorInputConnectionPoint = styled(styledConnectionPoint)`
  left: -10px;
  top: 70px;
  background: red;
`

const styledOutputConnectionPoint = styled(styledConnectionPoint)`
right: -10px;
top: 40px;
background: green;
`

const styledErrorOutputConnectionPoint = styled(styledConnectionPoint)`
  right: -10px;
  top: 70px;
  background: red;
`

export {
  styledInputConnectionPoint as InputConnectionPoint,
  styledErrorInputConnectionPoint as ErrorInputConnectionPoint,
  styledOutputConnectionPoint as OutputConnectionPoint,
  styledErrorOutputConnectionPoint as ErrorOutputConnectionPoint,
}
