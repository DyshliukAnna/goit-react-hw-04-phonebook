import { Component } from 'react';
import { nanoid } from 'nanoid';
import '../App.css';
import { ContactForm } from './ContactForm';
import { ContactList } from './ContactList';
import { DATA_KEY } from './Constant';
import { Filter } from './Filter';
export class App extends Component {
  state = {
    contacts: [
      { name: 'Rosie Simpson', id: nanoid(), number: '459-12-56' },
      { name: 'Hermione Kline', id: nanoid(), number: '443-89-12' },
      { name: 'Eden Clements', id: nanoid(), number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem(DATA_KEY);
    if (contacts) {
      this.setState({ contacts: JSON.parse(contacts) });
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem(DATA_KEY, JSON.stringify(this.state.contacts));
    }
  }


  formSubmitHandler = data => {
    const existingContact = this.state.contacts.find(
      contact => contact.name === data.name
    );
    if (existingContact) {
      alert(`${data.name} is already in contacts`);
      return;
    }
    const newContact = { id: nanoid(), ...data };
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };
  handleInputFind = e => {
    this.setState({
      filter: e.currentTarget.value,
    });
  };
  handleDeleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const normilizedFilter = this.state.filter.toLowerCase();

    const searchedContact = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normilizedFilter)
    );
    return (
      <div className="container">
        <h1 className="container__title">Phonebook</h1>
        <ContactForm
          onSubmit={this.formSubmitHandler}
          className="input"
          type="text"
          name={this.state.contacts.name}
          required
        />
        <h2 className="container__title">Contacts</h2>
        <Filter
          value={this.state.filter}
          onChangeFilter={this.handleInputFind}
        />
        <ContactList
          contacts={searchedContact}
          onClick={this.handleDeleteContact}
        />
      </div>
    );
  }
}
