import styled from "styled-components";
import { Grid } from "@material-ui/core";

interface MainGridProps {
  visible?: {
    value: boolean;
  };
}

export const StyledMainGrid = styled(Grid)<MainGridProps>`
  @media (max-width: 600px) {
    display: ${(props) => (props.visible?.value ? "none" : null)};
  }
  @media (min-width: 601px) {
    padding: 0px 5px;
  }
`;
