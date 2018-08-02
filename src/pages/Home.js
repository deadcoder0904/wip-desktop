import React from "react";
import styled from "react-emotion";

import Query from "../components/Query";
import { GET_PRODUCTS } from "../graphql/queries/GetProducts";
import { GET_CURRENT_USER } from "../graphql/queries/GetCurrentUser";
import Loading from "../components/Loading";

import construction from "../static/construction.svg";

const Logo = styled.img`
  width: 5rem;
  height: 5rem;
`;

export const Home = () => (
  <Query query={GET_CURRENT_USER}>
    {({ data: { viewer } }) => {
      return (
        <div>
          <Logo src={construction} />
          <h1>
            {viewer.first_name} {viewer.last_name}
          </h1>
          <span>{viewer.username}</span>
          <div>
            {viewer.products.map(product => (
              <div key={product.id}>
                <h3>{product.name}</h3>
                <h4>{product.url}</h4>
                <span>#{product.hashtag}</span>
                <h5>{product.website_url}</h5>
                <div>
                  {product.todos.map(t => (
                    <div key={t.id}>
                      {t.body} - {t.completed_at}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }}
  </Query>
);
