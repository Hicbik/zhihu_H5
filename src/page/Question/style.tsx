import styled from 'styled-components'

export const Wrapper = styled('div')`
padding-top: 53px;
background-color: ${(props: { err: boolean | undefined }) => props.err ? '#fff' : '#f6f6f6'};
height: 100%;
overflow-x: hidden;

.ql-editor {
  padding: 0;
}
`
