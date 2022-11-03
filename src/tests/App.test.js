import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from '../helpers/renderWith';
import App from '../App';
import mockData from '../helpers/mockData';

const EMAIL_TEST_ID = 'email-input';
const PASSWORD_TEST_ID = 'password-input';

describe('Realize 60% de cobertura nos tests', () => {
  test('teste se assim que o APP é renderizado aparece a mensagem', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toBe('/');

    const textLogin = screen.getByRole('heading', { name: /Insira seu Login/i, level: 1 });
    expect(textLogin).toBeInTheDocument();
  });

  test('teste se assim que o APP é renderizado aparece os inputs de login', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toBe('/');

    const inputLogin = screen.getByPlaceholderText(/Email/i);
    const inputPassword = screen.getByPlaceholderText(/Senha/i);

    expect(inputLogin).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
  });

  test('test se assim que o APP é renderizado aparece um button', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toBe('/');

    const buttonLogin = screen.getByRole('button', { name: /Entrar/i });

    expect(buttonLogin).toBeInTheDocument();
  });

  test('test se assim que é feito o login aparece o compo com o email', () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    expect(history.location.pathname).toBe('/carteira');

    const textEmailWallet = screen.getByRole('heading', { name: /Email:/i, level: 4 });

    expect(textEmailWallet).toBeInTheDocument();
  });
  test('test se assim que é feito o login aparece o compo para colocar as despesas', () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    expect(history.location.pathname).toBe('/carteira');

    const textDespesasWallet = screen.getByTestId('total-field');

    expect(textDespesasWallet).toBeInTheDocument();
  });
  test('test se assim que é feito o login aparece o compo de input para colocar as despesas', () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    expect(history.location.pathname).toBe('/carteira');

    const inputDespesasWallet = screen.getByTestId('value-input');

    expect(inputDespesasWallet).toBeInTheDocument();
  });
  test('test se assim que é feito o login aparece o compo de input para colocar a descrição', () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    expect(history.location.pathname).toBe('/carteira');

    const inputDescriptionWallet = screen.getByTestId('description-input');

    expect(inputDescriptionWallet).toBeInTheDocument();
  });
  test('test se assim que é feito o login aparece o compo para selecionar a moeda', () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    expect(history.location.pathname).toBe('/carteira');

    const selectCoins = screen.getByTestId('currency-input');

    expect(selectCoins).toBeInTheDocument();
  });
  test('test se assim que é feito o login aparece o compo para selecionar o tipo de despesa', () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    expect(history.location.pathname).toBe('/carteira');

    const selectTag = screen.getByTestId('tag-input');

    expect(selectTag).toBeInTheDocument();
  });
  test('test se assim que é feito o login aparece o compo para selecionar forma de pagamento', () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    expect(history.location.pathname).toBe('/carteira');

    const selectPay = screen.getByTestId('method-input');

    expect(selectPay).toBeInTheDocument();
  });
  test('teste se o botão de loguin só fica habilitado se colocar o email e senha', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toBe('/');

    const emailInput = screen.getByTestId(EMAIL_TEST_ID);
    const passwordInput = screen.getByTestId(PASSWORD_TEST_ID);
    const buttonInput = screen.getByRole('button', { name: /Entrar/i });

    userEvent.clear(emailInput);
    userEvent.clear(passwordInput);

    expect(buttonInput).toBeDisabled();
  });
  test('teste se quando colocado o email e senha corretos o botão é habilitado e o cliente é redirecionado para /carteira', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toBe('/');

    const emailInput = screen.getByTestId(EMAIL_TEST_ID);
    const passwordInput = screen.getByTestId(PASSWORD_TEST_ID);
    const buttonInput = screen.getByRole('button', { name: /Entrar/i });

    userEvent.type(emailInput, 'test@hotmail.com');
    userEvent.type(passwordInput, '123456');

    expect(buttonInput).toBeEnabled();

    userEvent.click(buttonInput);

    expect(history.location.pathname).toBe('/carteira');
  });
  test('test se o botão fica desabilitado caso email e senha sejão invalidos', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toBe('/');

    const emailInput = screen.getByTestId(EMAIL_TEST_ID);
    const passwordInput = screen.getByTestId(PASSWORD_TEST_ID);
    const buttonInput = screen.getByRole('button', { name: /Entrar/i });

    userEvent.clear(emailInput);
    userEvent.clear(passwordInput);

    userEvent.type(emailInput, 'test@hotmail.com');
    userEvent.type(passwordInput, '12');

    expect(buttonInput).toBeDisabled();

    userEvent.clear(emailInput);
    userEvent.clear(passwordInput);

    userEvent.type(emailInput, 'tes');
    userEvent.type(passwordInput, '123456');

    expect(buttonInput).toBeDisabled();

    userEvent.clear(emailInput);
    userEvent.clear(passwordInput);

    userEvent.type(emailInput, 'tes');
    userEvent.type(passwordInput, '123');

    expect(buttonInput).toBeDisabled();
  });
  test('test o componente Table', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockData,
    }));

    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    expect(history.location.pathname).toBe('/carteira');

    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const currencyInput = await screen.findByTestId('currency-input');
    const methodInput = screen.getByTestId('method-input');
    const tagInput = screen.getByTestId('tag-input');
    const buttonAdd = await screen.findByText('Adicionar despesa');
    const table = screen.getByRole('table');

    expect(valueInput).toBeInTheDocument();
    expect(valueInput).toHaveValue(null);
    expect(descriptionInput).toBeInTheDocument();
    expect(descriptionInput).toHaveValue('');
    expect(currencyInput).toBeInTheDocument();
    expect(methodInput).toBeInTheDocument();
    expect(tagInput).toBeInTheDocument();
    expect(buttonAdd).toBeInTheDocument();
    expect(table).toBeInTheDocument();

    userEvent.type(valueInput, '50');
    userEvent.type(descriptionInput, 'mercado');
    userEvent.type(currencyInput, 'CAD');
    userEvent.type(methodInput, 'Dinheiro');
    userEvent.type(tagInput, 'Alimentação');

    expect(valueInput).toHaveValue(50);
    expect(descriptionInput).toHaveValue('mercado');

    userEvent.click(buttonAdd);

    const valueConvert = screen.getByText(/Valor convertido/i);
    const buttonDelete = await screen.findByTestId('delete-btn');
    const buttonEdit = screen.getByRole('button', { name: /Editar despesa/i });

    expect(valueConvert).toBeInTheDocument();
    expect(buttonDelete).toBeInTheDocument();
    expect(buttonEdit).toBeInTheDocument();

    userEvent.click(buttonDelete);

    expect(buttonDelete).not.toBeInTheDocument();
    expect(valueInput).toHaveValue(null);
    expect(descriptionInput).toHaveValue('');
  });
  test('test se quando corre um erro na chamada de api o erro aparece', async () => {
    const messageError = 'Error';
    const messageNewError = new Error(messageError);
    global.fetch = jest.fn(() => Promise.reject(messageNewError));

    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    expect(history.location.pathname).toBe('/carteira');

    const errorRenderizado = await screen.findByText(messageError);

    expect(errorRenderizado).toBeInTheDocument();
  });
  test('', () => {

  });
  test('', () => {

  });
  test('', () => {

  });
  test('', () => {

  });
  test('', () => {

  });
});
