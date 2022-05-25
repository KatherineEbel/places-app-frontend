import {useNavigate} from "react-router-dom";
import Input from "../../shared/components/form-elements/Input";
import {useForm} from "../../shared/hooks/use-form";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../shared/context/auth";
import {useToast} from "../../shared/hooks/use-toast";
import {useHttpClient} from "../../shared/hooks/use-http-client";
import ImageUpload from "../../shared/components/form-elements/image-upload/ImageUpload";

export default function Auth() {
  const auth = useContext(AuthContext);
  const toast = useToast(5000);

  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const {processing} = useHttpClient();
  const {inputs, valid, inputHandler, setFormData} = useForm({
    email: {
      value: "",
      valid: false,
    },
    password: {
      value: "",
      valid: false,
    },
  });

  const toggleMode = () => {
    if (mode === "login") {
      setFormData(
        {...inputs, name: {value: "", valid: false}, image: {value: null, valid: false}},
        Object.values(inputs).every((i) => i?.valid)
      );
      setMode("register");
    } else {
      setFormData({...inputs, name: undefined, image: undefined}, valid);
      setMode("login");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(inputs).forEach(input => {
        formData.append(input, inputs[input].value)
      });

      await auth[mode](formData);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (auth.user) {
      navigate('/users');
      toast('success', `Welcome ${auth.user.name}`)
    }

  }, [auth.user, navigate, toast])

  return (
    <main className='grid place-items-center pt-8 max-w-md mx-auto'>
      <h2 className="card-title">{mode.toUpperCase()}</h2>
      <form className={`${mode === 'register' ? 'grid gap-4 grid-rows-2 md:grid-rows-1 md:grid-cols-2 place-items-center w-11/12' : ''}`} id="auth-form" onSubmit={handleSubmit}>
        <div>
          {mode === "register" && (
            <Input
              label='Name'
              id="name"
              title="Name"
              type="text"
              valid={inputs.name?.valid}
              onInput={inputHandler}
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Name is required"
            />
          )}
          <Input
            label='Email'
            id="email"
            title="Email"
            type="text"
            valid={inputs.email.valid}
            onInput={inputHandler}
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email"
          />
          <Input
            label='Password'
            id="password"
            title="Password"
            type="password"
            valid={inputs.password.valid}
            onInput={inputHandler}
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(6)]}
            errorText="Password needs to be at least 6 characters long"
          />
        </div>
        {mode === 'register' && (
          <ImageUpload id='image' center
                       onInput={inputHandler}
          />
        )}
        {mode === "login" ? (
          <button className="btn btn-link btn-secondary" onClick={toggleMode}>
            Don't have an account?
          </button>
        ) : (
          <button className="btn btn-link btn-secondary self-start" onClick={toggleMode}>
            Already have an account?
          </button>
        )}
        <button
          className={`btn btn-block btn-primary ${!valid ? "btn-disabled" : ""} ${processing ? 'loading' : ''}`}
          form="auth-form"
          type="submit"
          disabled={!valid}
        >
          {mode === "login" ? "Log In" : "Register"}
        </button>
      </form>
    </main>
  );
}
