import * as React from "react";
import Poem from "src/components/poem/Poem";
import * as InfiniteScroll from "react-infinite-scroller";
import { Query, QueryResult } from "react-apollo";
import { GET_POEMS, IGetPoemsResponse, POEM_LIMIT } from "./graphql";
import { last } from "lodash";
import styled from "styled-components";
import { IPoem } from "src/components/types";
import { ApolloQueryResult } from "apollo-boost";

const PoemContainerDiv = styled.div`
  margin: auto;
`;

const IndexView = ({
  poems,
  hasMore,
  loadMore,
}: {
  poems: IPoem[];
  hasMore: boolean;
  loadMore: (page: number) => Promise<ApolloQueryResult<IGetPoemsResponse>>;
}) => {
  return (
    <PoemContainerDiv>
      <InfiniteScroll
        loadMore={loadMore}
        hasMore={hasMore}
        loader={<div className="loader">Loading ...</div>}
      >
        {poems && poems.map(poem => <Poem poem={poem} key={poem.id} />)}
      </InfiniteScroll>
    </PoemContainerDiv>
  );
};

class IndexViewWData extends React.PureComponent<{ userId?: number }> {
  render() {
    return (
      <Query
        query={GET_POEMS}
        variables={{
          offset: 0,
          authorId: this.props.userId,
        }}
        // notifyOnNetworkStatusChange
        // fetchPolicy="cache-and-network"
      >
        {({
          error,
          data,
          loading,
          fetchMore,
        }: QueryResult<IGetPoemsResponse, {}>) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;
          if (!data) return <p>Empty</p>;

          return (
            <IndexView
              poems={data.poems.items}
              hasMore={data.poems.hasMore}
              loadMore={page => {
                return fetchMore({
                  variables: {
                    offset: page * POEM_LIMIT,
                  },
                  updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return prev;
                    if (
                      (last(prev.poems.items) || ({} as any)).id ===
                      (last(fetchMoreResult.poems.items) || ({} as any)).id
                    ) {
                      return prev; // getting double called randomly
                    }
                    return Object.assign({}, prev, {
                      poems: {
                        ...fetchMoreResult.poems,
                        items: [
                          ...prev.poems.items,
                          ...fetchMoreResult.poems.items,
                        ],
                      },
                    });
                  },
                });
              }}
            />
          );
        }}
      </Query>
    );
  }
}

export default IndexViewWData;
