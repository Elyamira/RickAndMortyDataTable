import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import Store from './store/app'

const renderDefault = () => {
  render(
    <Provider store={Store}>
      <App />
    </Provider>
  );
}

test('app opens and displays the main characters', async () => {
  renderDefault();

  const rickSanchez = await screen.findByText(/Rick Sanchez/i);
  expect(rickSanchez).toBeInTheDocument();

  const totalCharacters = await screen.findAllByRole("row");
  expect(totalCharacters.length).toBe(21);
});

test('when sort, things get sorted', async () => {
  renderDefault();

  const button = screen.getByRole('header-name')
  fireEvent.click(button)

  const rows = await screen.findAllByRole('row');
  expect(rows[1]).toHaveTextContent('Abadango Cluster Princess')
  expect(rows[2]).toHaveTextContent('Abradolf Lincler')
  expect(rows[3]).toHaveTextContent('Adjudicator Rick')
  expect(rows[20]).toHaveTextContent('Summer Smith')

  fireEvent.click(button)

  const changedRows = await screen.findAllByRole('row');
  expect(changedRows[1]).toHaveTextContent('Summer Smith')
  expect(changedRows[2]).toHaveTextContent('Rick Sanchez')
  expect(changedRows[3]).toHaveTextContent('Morty Smith')
  expect(changedRows[20]).toHaveTextContent('Abadango Cluster Princess')
});

test('when search, data is returned', async () => {
  renderDefault();

  const search = screen.getByLabelText<HTMLInputElement>('search')

  fireEvent.change(search, { target: { value: '23' } })
  expect(search.value).toBe('23')

  fireEvent.change(search, { target: { value: 'Rick' } })
  const changedRows = await screen.findAllByRole('row');
  expect(changedRows).toHaveLength(5);

  fireEvent.change(search, { target: { value: '' } })
  const resetRows = await screen.findAllByRole('row');
  expect(resetRows).toHaveLength(21);
});

test('when click on see more info button, a popup window with characterInfo appears', async () => {
  renderDefault();

  const button1 = screen.getByRole('button-1')
  fireEvent.click(button1)
  const rickSanchez = await screen.findByText(/Rick Sanchez/i);
  expect(rickSanchez).toBeInTheDocument();
  const button19 = screen.getByRole('button-19')
  fireEvent.click(button19)
  const antennaRick = await screen.findByText(/Antenna Rick/i);
  expect(antennaRick).toBeInTheDocument();

});

test('when click on edit button, a chaacter can be edited', async () => {
  renderDefault();

  const editButton = screen.getByRole('edit-1')
  fireEvent.click(editButton)

  const search = screen.getByLabelText<HTMLInputElement>('name')
  expect(search).toBeInTheDocument();
  fireEvent.change(search, { target: { value: 'Newly edited test character' } })

  const submitBtn = screen.getByRole('button', { name: 'Submit changes' });
  fireEvent.click(submitBtn);

  const newlyEditedCharacter = await screen.findByText(/Newly edited test character/i);
  expect(newlyEditedCharacter).toBeInTheDocument();
});