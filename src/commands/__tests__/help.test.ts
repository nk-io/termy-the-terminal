import help from '../help';
import { render } from 'react-testing-library';
import services from '../';

describe('help suite', (): void => {
  it('should contain help descriptions for each service', async (): Promise<
    void
  > => {
    const helpResult = await help();
    const { container } = render(helpResult.commandResult as JSX.Element);

    Object.keys(services).forEach(
      (service): void => {
        expect(container.innerHTML).toContain(service);
      },
    );
  });
});