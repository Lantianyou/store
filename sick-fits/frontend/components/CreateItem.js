import React, { Component } from 'react';
import Form from './styles/Form';

class CreateItem extends Component {
  state = {
    title: '',
    description: '',
    image: '',
    largeImage: '',
    price: 0,
  };

  render() {
    return (
      <Form>
        <fieldset>
          <label htmlFor="title">
            Title
            <input
              type="text"
              id="title"
              name="title"
              placeholder="title"
              required
            />
          </label>
        </fieldset>
      </Form>
    );
  }
}

export default CreateItem;
