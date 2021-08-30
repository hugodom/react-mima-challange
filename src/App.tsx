/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { Grid, Hidden } from '@material-ui/core';
import { Cart } from './components/Cart/Cart';
import { MobileHeader } from './components/MobileHeader/MobileHeader';
import { ProductList } from './components/ProductList/ProductList';
import useStore, { GlobalState } from './state/items.state';
import { ThemeConfig } from './theme/ThemeConfig';
import { StyledMainGrid } from './App.styles';

// Create a client
const queryClient = new QueryClient();

function App() {
  const { cartOpen }: GlobalState = useStore();

  return (
    <ThemeConfig>
      <QueryClientProvider client={queryClient} contextSharing={true}>
        <div className="App" data-testid="App">
          <Hidden smUp>
            <MobileHeader />
          </Hidden>
          <Grid container direction="row">
            <StyledMainGrid
              item
              xs={12}
              sm={6}
              md={8}
              visible={{ value: cartOpen }}
            >
              <ProductList />
            </StyledMainGrid>
            <StyledMainGrid
              item
              xs={12}
              sm={6}
              md={4}
              visible={{ value: !cartOpen }}
            >
              <Cart />
            </StyledMainGrid>
          </Grid>
        </div>
      </QueryClientProvider>
    </ThemeConfig>
  );
}

export default App;
