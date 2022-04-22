import { render, screen } from '@testing-library/react';
import SearchBar from './index'
import userEvent from '@testing-library/user-event';
import { ITrack } from '../../interface-types/track';
import { ChangeEvent, FormEvent } from 'react';


const setup = () => {
    render(
        <SearchBar tracks={[]} toggleSelect={function (track: ITrack): void {
            throw new Error('Function not implemented.');
        } } input={{
            searchKey: ''
        }} getTracks={function (event: FormEvent<HTMLFormElement>): void {
            throw new Error('Function not implemented.');
        } } handleInput={function (event: ChangeEvent<HTMLInputElement>): void {
            throw new Error('Function not implemented.');
        } }/>
    );
}

beforeEach(() => {
    setup();
})

test('Render Main Page and check for form existance', () => {
    const searchInput = screen.getByTestId("search-input");
    const searchForm = screen.getByTestId("search-form");

    expect(searchInput).toBeInTheDocument();
    expect(searchForm).toBeInTheDocument();
})

test('Check if value is empty', () => {
    const searchInput = screen.getByTestId("search-input");

    expect(searchInput).toHaveValue("");
})

test('Check if the input value is correct', () => {
    const searchInput = screen.getByTestId("search-input");

    userEvent.type(searchInput, "Search Keyword test");

    expect(searchInput).toHaveValue("Search Keyword test");
})