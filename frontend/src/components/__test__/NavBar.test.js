import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import NavBar from '../NavBar';

const MockNavBar = () => {
    return(
        <BrowserRouter>
            <NavBar/>
        </BrowserRouter>
    );
}

test("checking if navbar contains logo and Code Clash", () => {
    render(
        <MockNavBar/>
    );
    const headingElement = screen.getByRole('heading', {name: "Code Clash"});
    const imgElement = screen.getByAltText('rocket');
    expect(headingElement).toBeVisible();
    expect(imgElement).toBeVisible();
});
