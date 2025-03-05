import * as React from 'react';
import { Form, Field, FormElement, FieldWrapper } from '@progress/kendo-react-form';
import { Error } from '@progress/kendo-react-labels';
import { Input } from '@progress/kendo-react-inputs';
import { Button } from '@progress/kendo-react-buttons';
import { Typography } from '@progress/kendo-react-common';
import { Loader } from '@progress/kendo-react-indicators';
import { useNavigate, Link } from "react-router-dom";

import axios from "axios";
import registerImage from "../images/register.png";
const emailRegex = new RegExp(/\S+@\S+\.\S+/);
const passwordRegex = /^.{5,15}$/;
const nameRegex = /^[A-Za-z\s]+$/

const emailValidator = value => emailRegex.test(value) ? '' : 'Please enter a valid email.';
const passwordValidator = value => {
    return passwordRegex.test(value) ? '': 'Password has to be between 5-15 characters long'

}
const nameValidator = value => {
    return nameRegex.test(value) ? '': 'Name cannot include number and special characters'

}
    const PasswordInput = fieldRenderProps => {
    const {
        validationMessage,
        visited,
        ...others
    } = fieldRenderProps
    return (
        <div className='k-form-field-wrap'>
            <Input {...others} labelClassName={'k-form-label'} />
            {visited && validationMessage && <Error>{validationMessage}</Error>}
        </div>
    )
    
}
const EmailInput = fieldRenderProps => {
  const {
    validationMessage,
    visited,
    ...others
  } = fieldRenderProps;
  return <div className="k-form-field-wrap">
            <Input {...others} labelClassName={'k-form-label'} />
            {visited && validationMessage && <Error>{validationMessage}</Error>}
        </div>;
};

const NameInput = fieldRenderProps => {
    const {
      validationMessage,
      visited,
      ...others
    } = fieldRenderProps;
    return <div className="k-form-field-wrap">
              <Input {...others} labelClassName={'k-form-label'} />
              {visited && validationMessage && <Error>{validationMessage}</Error>}
          </div>;
  };
const Register = (props) => {
    const [loaderVisible, setLoaderVisible] = React.useState(false)
    const navigate = useNavigate();
    const handleSubmit = (dataItem) => {
        axios.post(`${process.env.REACT_APP_HOST}/auth/register`, dataItem)
            .then(response => {
                setLoaderVisible((prevState) => !prevState)
                if (response.data){
                    setTimeout(()=> {
                        navigate("/login")
                    }, 2000)
                }
            })
            .catch(error => {console.log(error)})
    }
  
    return (
      <>
        {
            loaderVisible ? 
            <div className="d-flex flex-column justify-content-center align-items-center vh-100">
                 <Loader size='large' type={"infinite-spinner"} />
                 <Typography.h4 className="mt-3">Creating new user...</Typography.h4>     
            </div>
            :
            <div className="d-flex align-items-center justify-content-center vh-100">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-sm-12">
                        <Typography.h1>Register</Typography.h1>
                        <Form
                            onSubmit={handleSubmit}
                            render={(formRenderProps) => (
                            <FormElement style={{ maxWidth: 650 }}>
                                <fieldset className="k-form-fieldset">
                                <FieldWrapper>
                                    <Field
                                    name="name"
                                    type="text"
                                    component={NameInput}
                                    label="Name"
                                    validator={nameValidator}
                                    />
                                </FieldWrapper>
                                <FieldWrapper>
                                    <Field
                                    name="email"
                                    type="email"
                                    component={EmailInput}
                                    label="Email"
                                    validator={emailValidator}
                                    />
                                </FieldWrapper>
                    
                                <FieldWrapper>
                                    <Field
                                    name="password"
                                    type="password"
                                    component={PasswordInput}
                                    label="Password"
                                    validator={passwordValidator}
                                    />
                                </FieldWrapper>
                                </fieldset>
                    
                                <div className="k-form-buttons">
                                    <Button disabled={!formRenderProps.allowSubmit}>
                                        Submit
                                    </Button>
                                </div>
                            </FormElement>
                            )}
                        />
                    </div>
                    <div class="col-md-6 col-sm-12">
                        <img src={registerImage} />

                    </div>
                </div>
            </div>    
        </div>   

        }
           
          

      </>
      
    );
  };
  
  export default Register;
  