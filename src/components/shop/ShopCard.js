import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const CardWrapper = styled.div`
  background: ${(props) => props.bg};
  width: 350px;
  margin: auto;
  padding-bottom: 20px;
  border-radius: ${(props) => props.borderRadius}px;
`;

const Title = styled.h3`
  color: ${(props) => props.titleColor}
  margin: 0;
  padding: 15px;
`;

const Description = styled.p`
  color: ${(props) => props.textColor};
  padding: 0px 15px;
  margin: 0;
`;

export const ShopCard = ({
  image,
  title,
  link,
  description,
  titleColor,
  textColor,
  borderRadius,
  ...props
}) => (
  <CardWrapper borderRadius={borderRadius} {...props}>
    <Link to={link}>
      <Title titleColor={titleColor}>{title}</Title>
      <Description textColor={textColor}>{description}</Description>
    </Link>
  </CardWrapper>
);

ShopCard.defaultProps = {
  bg: "white",
  titleColor: "#1982c4",
  textColor: "#999",
  borderRadius: 5,
};
