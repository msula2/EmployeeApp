import * as React from 'react';
import { Form, Field, FormElement, FieldWrapper } from '@progress/kendo-react-form';
import { Error } from '@progress/kendo-react-labels';
import { Input } from '@progress/kendo-react-inputs';
import { Button } from '@progress/kendo-react-buttons';
import { Typography } from '@progress/kendo-react-common';
import { Loader } from '@progress/kendo-react-indicators';
import { useNavigate, Link } from "react-router-dom";

import axios from "axios";
import loginImage from "../images/login.png";
const emailRegex = new RegExp(/\S+@\S+\.\S+/);
const passwordRegex = /^.{5,15}$/;

const emailValidator = value => emailRegex.test(value) ? '' : 'Please enter a valid email.';
const passwordValidator = value => {
    return passwordRegex.test(value) ? '': 'Password has to be between 5-15 characters long'

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
const Login = (props) => {
    const [loaderVisible, setLoaderVisible] = React.useState(false)
    const navigate = useNavigate();
    const handleSubmit = (dataItem) => {
        setLoaderVisible((prevState) => !prevState)
        axios.post(`${process.env.REACT_APP_HOST}/auth/login`, dataItem)
            .then(response => {
                if (response.data){
                    props.setLoggedIn((prevState) => !prevState)
                    setTimeout(()=> {
                        navigate("/")
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
                 <Typography.h4 className="mt-3">Logging In ...</Typography.h4>     
            </div>
            :
            <div className="d-flex align-items-center justify-content-center vh-100">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-sm-12">
                        <Typography.h1>Login</Typography.h1>
                        <Form
                            onSubmit={handleSubmit}
                            render={(formRenderProps) => (
                            <FormElement style={{ maxWidth: 650 }}>
                                <fieldset className="k-form-fieldset">
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
                                    <Link to="/register"><Typography.h6>Not registered ? Create new user</Typography.h6></Link>
                                </div>
                            </FormElement>
                            )}
                        />
                    </div>
                    <div class="col-md-6 col-sm-12">
                        <img src={loginImage} />

                    </div>
                </div>
            </div>    
        </div>   

        }
           
          

      </>
      
    );
  };
  
  export default Login;
  