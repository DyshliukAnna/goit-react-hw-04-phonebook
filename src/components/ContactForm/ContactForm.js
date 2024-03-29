// import PropTypes from 'prop-types';
import { useState } from 'react';
import css from './ContactForm.module.css';
import PropTypes from 'prop-types';

export const ContactForm = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

 const handleInputChange = event => {
    const { name, value } = event.currentTarget;

    switch(name) {
      case 'name':
      setName(value);
      break;
      case 'number':
      setNumber(value);
      break;

      default:
      return;
    }
  }

  const handleSubmitForm = event => {
    event.preventDefault();

    onSubmit({ name, number });

    reset();

  };

  const reset = () => {
    setName('');
    setNumber('');
  }

  return (
  <div className={css.phonebookForm}>
  <form onSubmit={handleSubmitForm}>
    <label className={css.phonebookFormItem}>
      Name
      <input
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яіїєґА-ЯІЇЄҐ]+(([' -][a-zA-Zа-яіїєґА-ЯІЇЄҐ ])?[a-zA-Zа-яіїєґА-ЯІЇЄҐ]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        value={name}
        onChange={handleInputChange}
      />
    </label>
    <label className={css.phonebookFormItem}>
      Number
      <input
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        value={number}
        onChange={handleInputChange}
      />
    </label>
    <button type="submit"> Add Contact </button>
  </form>
</div>
)
}

ContactForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };
  // }
  // state = {
  //   name: '',
  //   number: '',
  // };

  // handleSubmitForm = e => {
  //   e.preventDefault();

  //   this.props.onSubmit(this.state);

  //   this.resetForm();
  // };

  // handleInputChange = event => {
  //   const { name, value } = event.currentTarget;

  //   this.setState({ [name]: value });
  // };

  // resetForm = () => {
  //   this.setState({
  //     name: '',
  //     number: '',
  //   });
  // };

//   render() {
//     return (
//       <div className={css.phonebookForm}>
//         <form onSubmit={this.handleSubmitForm}>
//           <label className={css.phonebookFormItem}>
//             Name
//             <input
//               type="text"
//               name="name"
//               pattern="^[a-zA-Zа-яіїєґА-ЯІЇЄҐ]+(([' -][a-zA-Zа-яіїєґА-ЯІЇЄҐ ])?[a-zA-Zа-яіїєґА-ЯІЇЄҐ]*)*$"
//               title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
//               required
//               value={this.state.name}
//               onChange={this.handleInputChange}
//             />
//           </label>
//           <label className={css.phonebookFormItem}>
//             Number
//             <input
//               type="tel"
//               name="number"
//               pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
//               title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
//               required
//               value={this.state.number}
//               onChange={this.handleInputChange}
//             />
//           </label>
//           <button type="submit"> Add Contact </button>
//         </form>
//       </div>
//     );
//   }
// }

