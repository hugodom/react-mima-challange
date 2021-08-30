import { render } from '@testing-library/react';
import { rest } from 'msw';
import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

const example = [
  {
    id: '41fd4fd9-95c7-4809-96db-a147d352fdbb',
    image_url:
      'https://dummyimage.com/400x400/28200e/000&text=Unbranded Metal Chair',
    stock: 2,
    productName: 'Unbranded Metal Chair',
    price: 43,
    productDescription:
      'Porro tempore autem. Sunt molestias qui quod recusandae nemo quia optio. Nostrum aperiam officiis aut reprehenderit illo.',
    favorite: 1
  },
  {
    id: '20cc33f1-223b-4cf0-878d-fdedb3f60b56',
    image_url:
      'https://dummyimage.com/400x400/2ee9f7/000&text=Handcrafted Metal Towels',
    stock: 41,
    productName: 'Handcrafted Metal Towels',
    price: 98,
    productDescription:
      'Rerum minima laudantium blanditiis dolorem dolores ut sint ut quidem. Est doloremque repellat excepturi dolor consequatur rerum qui. Facere ut vel et enim accusamus ipsum dolores aut. Eaque quo ut omnis unde quam error voluptas non iure.',
    favorite: 0
  }
];

const examplePatch = [
  {
    id: '41fd4fd9-95c7-4809-96db-a147d352fdbb',
    image_url:
      'https://dummyimage.com/400x400/28200e/000&text=Unbranded Metal Chair',
    stock: 8,
    productName: 'Unbranded Metal Chair',
    price: 43,
    productDescription:
      'Porro tempore autem. Sunt molestias qui quod recusandae nemo quia optio. Nostrum aperiam officiis aut reprehenderit illo.',
    favorite: 0
  },
  {
    id: '20cc33f1-223b-4cf0-878d-fdedb3f60b56',
    image_url:
      'https://dummyimage.com/400x400/2ee9f7/000&text=Handcrafted Metal Towels',
    stock: 41,
    productName: 'Handcrafted Metal Towels',
    price: 98,
    productDescription:
      'Rerum minima laudantium blanditiis dolorem dolores ut sint ut quidem. Est doloremque repellat excepturi dolor consequatur rerum qui. Facere ut vel et enim accusamus ipsum dolores aut. Eaque quo ut omnis unde quam error voluptas non iure.',
    favorite: 0
  }
];

export const handlers = [
  rest.get('*/grocery*', (req, res, ctx) =>
    res(ctx.status(200), ctx.json(example))
  ),
  rest.patch('*/grocery*', (req, res, ctx) =>
    res(ctx.status(200), ctx.json(examplePatch))
  )
];

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false
      }
    }
  });

export function renderWithClient(ui: React.ReactElement) {
  const testQueryClient = createTestQueryClient();
  const { rerender, ...result } = render(
    <QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>
  );
  return {
    ...result,
    rerender: (rerenderUi: React.ReactElement) =>
      rerender(
        <QueryClientProvider client={testQueryClient}>
          {rerenderUi}
        </QueryClientProvider>
      )
  };
}

export function createWrapper() {
  const testQueryClient = createTestQueryClient();
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={testQueryClient}>
      {children}
    </QueryClientProvider>
  );
}
