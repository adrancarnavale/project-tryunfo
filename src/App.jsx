import React from 'react';
import Form from './components/Form';
import Card from './components/Card';
import Filters from './components/Filters';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      hasTrunfo: false,
      isSaveButtonDisabled: true,
      savedCards: [],
      nameFilter: '',
      rareFilter: 'todas',
      trunfoFilter: false,
    };
  }

  onInputChange = ({ target }) => {
    const { name, type, checked } = target;
    const value = (type === 'checkbox') ? checked : target.value;
    this.setState({ [name]: value }, () => {
      this.setState({ isSaveButtonDisabled: this.formValidation() });
    });
  }

  onSaveButtonClick = (event) => {
    event.preventDefault();
    const { savedCards } = this.state;
    this.setState({ savedCards: [...savedCards, this.getCardInfos()] }, () => {
      this.cleanInputs();
      this.checkTrunfo();
    });
  }

  getCardInfos = () => {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo,
    } = this.state;
    return {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo,
    };
  }

  setFilterStates = ({ target }) => {
    const { name, type, checked, value } = target;
    const content = (type === 'checkbox') ? checked : value;
    this.setState({ [name]: content });
  }

  filterCards = () => {
    const { savedCards, nameFilter, rareFilter, trunfoFilter } = this.state;
    let filtered = savedCards.filter((card) => card.cardName.includes(nameFilter));
    if (rareFilter !== 'todas') {
      filtered = filtered.filter((card) => card.cardRare === rareFilter);
    }
    if (trunfoFilter) {
      filtered = filtered.filter((card) => card.cardTrunfo === trunfoFilter);
    }

    return filtered;
  };

  deleteItem = (event) => {
    event.preventDefault();
    const { savedCards } = this.state;
    this.setState({
      savedCards: savedCards.filter((card) => card.cardName !== event.target.name),
    }, () => {
      this.checkTrunfo();
    });
  }

  formValidation = () => {
    const {
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardName,
      cardDescription,
      cardImage,
      cardRare,
    } = this.state;
    const valueOfAttr1 = Number(cardAttr1);
    const valueOfAttr2 = Number(cardAttr2);
    const valueOfAttr3 = Number(cardAttr3);
    const maxIndividualValue = 90;
    const maxSumValue = 210;
    const minValue = 0;
    if (cardName === '') return true;
    if (cardDescription === '') return true;
    if (cardImage === '') return true;
    if (cardRare === '') return true;
    if (valueOfAttr1 + valueOfAttr2 + valueOfAttr3 > maxSumValue) return true;
    if (valueOfAttr1 > maxIndividualValue
      || valueOfAttr2 > maxIndividualValue
      || valueOfAttr3 > maxIndividualValue) return true;
    if (valueOfAttr1 < minValue
      || valueOfAttr2 < minValue
      || valueOfAttr3 < minValue) return true;
    return false;
  }

  checkTrunfo = () => {
    const { savedCards } = this.state;
    const trunfoAlready = savedCards.some((card) => card.cardTrunfo === true);
    this.setState({ hasTrunfo: trunfoAlready });
  }

  cleanInputs = () => {
    this.setState({
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      hasTrunfo: false,
    });
  }

  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo,
      isSaveButtonDisabled,
      nameFilter,
      rareFilter,
      trunfoFilter,
    } = this.state;
    return (
      <div>
        <Form
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          onInputChange={ this.onInputChange }
          isSaveButtonDisabled={ isSaveButtonDisabled }
          onSaveButtonClick={ this.onSaveButtonClick }
          hasTrunfo={ hasTrunfo }
        />
        <Card
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
        />
        <Filters
          setFilterStates={ this.setFilterStates }
          nameFilter={ nameFilter }
          rareFilter={ rareFilter }
          trunfoFilter={ trunfoFilter }
        />
        <ul>
          {this.filterCards().map((card) => (
            <li key={ card.cardName }>
              <Card
                cardName={ card.cardName }
                cardDescription={ card.cardDescription }
                cardAttr1={ card.cardAttr1 }
                cardAttr2={ card.cardAttr2 }
                cardAttr3={ card.cardAttr3 }
                cardImage={ card.cardImage }
                cardRare={ card.cardRare }
                cardTrunfo={ card.cardTrunfo }
              />
              <button
                name={ card.cardName }
                data-testid="delete-button"
                id="delete-button"
                type="button"
                onClick={ this.deleteItem }
              >
                Excluir
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
export default App;
