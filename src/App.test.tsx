import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './pages/HomePage';
import { Provider } from 'react-redux';
import  store  from './redux/store';
import {BrowserRouter} from 'react-router-dom';

test('render App', () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
          <Home />
      </Provider>
    </BrowserRouter>
    );
  const linkElement = screen.getByText(/Create Playlist/i);
  expect(linkElement).toBeInTheDocument();
});