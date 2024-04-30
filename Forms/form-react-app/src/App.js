import React, { useState } from 'react';
import './App.css';
//using useState to initialize state for the form
function App() {
  const [formData, setFormData] = useState({//our variable holds fname lname and email
    firstName: '',
    lastName: '',
    email: ''
  });
//another useState hook but this time to initalize errors state
  const [errors, setErrors] = useState({});
  const [formVisible, setFormVisible] = useState(true);
//function that handles a change in the form fields
  const handleChange = (e) => {
    const { name, value } = e.target;//points to the input element that caused the change
    setFormData({//setting form data
      ...formData,//state obj
      [name]: value//updating
    });
  };
//function for whenever the form is submitted
  const handleSubmit = (e) => {
    e.preventDefault();//no page reload
    const errors = {};//empty errors, if there is an error stored here
    
    //validation pulled from prior code
    if (!formData.firstName.match(/^[a-zA-Z]+$/)) {
      errors.firstName = 'First name must contain only letters';
    }
    if (!formData.lastName.match(/^[a-zA-Z]+$/)) {
      errors.lastName = 'Last name must contain only letters';
    }
    if (!formData.email.includes('@')) {
      errors.email = 'Email must contain an "@" symbol';
    }

    //here we check if there are any errors
    if (Object.keys(errors).length > 0) {//if our errors obj is not empty then we set errors state to add the new errors using setErrors
      setErrors(errors);//setErrors 
      return;//returning so we cannot move forward with errors
    }

    //if no errors, (obj is empty) then we move on by setting errors to empty using setErrors
    setErrors({});
    //debugging/whatnot
    console.log('Form submitted:', formData);
    setFormVisible(false);
  };
//woo
  return (//render
    <div>
      {formVisible ? (//conditional statement to check status of form visiblility. If true, render the content **UP TO FIRST )**. If false render when true closes
        <div>
          <h1>Basic Form with Validation</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label>First Name:</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
              {errors.firstName && <span style={{ color: 'red' }}>{errors.firstName}</span>}
            </div>
            <div>
              <label>Last Name:</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
              {errors.lastName && <span style={{ color: 'red' }}>{errors.lastName}</span>}
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
            </div>
            <div>
              <button type="submit">Submit</button>
              <button type="button" onClick={() => setFormData({ firstName: '', lastName: '', email: '' })}>
                Clear
              </button>
            </div>
          </form>
        </div>
      )//END OF formVisible = TRUE
       : ( //START OF formVisible = FALSE
        <div>
          <p>Form submitted successfully!</p>
          <button onClick={() => setFormVisible(true)}>Show Form Again</button>
        </div>
      )}
    </div>
  );
}
//buh
export default App;