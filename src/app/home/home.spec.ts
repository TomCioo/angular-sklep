import { render, screen } from '@testing-library/angular';
import { Home } from './home';
import '@testing-library/jest-dom/vitest';

describe('Home', () => {
  it('wyświetla napis Sklep w headerze', async () => {
    const { container } = await render(Home);

    const header = container.querySelector('header');

    expect(header).not.toBeNull();
    expect(header).toHaveTextContent('Sklep');
  });
});