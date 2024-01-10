import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import '../App.css';
import { ContactForm } from './ContactForm';
import { ContactList } from './ContactList';
import { DATA_KEY } from './Constant';
import { Filter } from './Filter';

const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem(DATA_KEY)) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(DATA_KEY, JSON.stringify(contacts));
  }, [contacts]);


  const formSubmitHandler = data => {
    const existingContact = contacts.find(
      contact => contact.name === data.name
    );
    if (existingContact) {
      alert(`${data.name} is already in contacts`);
      return;
    }
    const newContact = { id: nanoid(), ...data };
    setContacts(prevState => [...prevState, newContact]);
  };
  
  const handleInputFind = e => {
    setFilter(e.currentTarget.value)
  };

  const handleDeleteContact = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  const filteredContacts = () => {
    const normilizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normilizedFilter)
    );
  };

    return (
      <div className="container">
        <h1 className="container__title">Phonebook</h1>
        <ContactForm
          onSubmit={formSubmitHandler}
          className="input"
          type="text"
          name={contacts.name}
          required
        />
        <h2 className="container__title">Contacts</h2>
        <Filter
          value={filter}
          onChangeFilter={handleInputFind}
        />
        <ContactList
          contacts={filteredContacts()}
          onClick={handleDeleteContact}
        />
      </div>
    );
  }
  export default App;