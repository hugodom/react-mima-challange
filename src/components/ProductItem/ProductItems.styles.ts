import styled from 'styled-components';
import { CardMedia, Typography } from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

interface TextProps {
  truncated?: {
    value: boolean;
    amount: number;
  };
}

export const FavoriteBorderStyled = styled(FavoriteBorderIcon)`
  color: red;
  cursor: pointer;
`;

export const FavoriteStyled = styled(FavoriteIcon)`
  color: red;
  cursor: pointer;
`;

export const CardMediaStyled = styled(CardMedia)`
  height: 140px;
`;

export const BodyText = styled(Typography)<TextProps>`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: ${(props) =>
    props.truncated?.value ? props.truncated?.amount : 'none'};
  -webkit-box-orient: vertical;
`;
