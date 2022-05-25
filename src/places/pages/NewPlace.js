import Input from "../../shared/components/form-elements/Input";
import {VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from "../../shared/util/validators";
import {useForm} from "../../shared/hooks/use-form";
import {useAuth} from "../../shared/context/auth";
import {useHttpClient} from "../../shared/hooks/use-http-client";
import {useNavigate} from "react-router-dom";
import ImageUpload from "../../shared/components/form-elements/image-upload/ImageUpload";

export default function NewPlace() {
  const { user } = useAuth();
  const { sendRequest, processing } = useHttpClient();
  const navigate = useNavigate();
  const { inputHandler, inputs, valid} = useForm({
    title: {
      value: '',
      valid: false,
    },
    description: {
      value: '',
      valid: false,
    },

    image: {
      value: null,
      valid: false,
    },
  }, false)

  const addPlaceHandler = async (event) => {
    if (!user || !user.token) return;
    event.preventDefault();
    const formData = new FormData()
    Object.keys(inputs).forEach(input => formData.append(input, inputs[input].value))
    const data = await sendRequest('/api/places', 'POST', formData, {'Authorization': `Bearer ${user.token}`});
    if (data) {
      navigate(`/${user.id}/places`, { replace: true })
    }
  };

  return (
    <main className='grid place-items-center pt-8 max-w-md mx-auto'>
      <h2 className='font-medium text-3xl'>Add a New Place</h2>
      <form className='grid grid-cols-2 gap-4 md:gap-8 place-items-center w-full' onSubmit={addPlaceHandler}>
        <div>
          <Input label="Title"
                 type='text'
                 id='title'
                 onInput={inputHandler}
                 validators={[VALIDATOR_REQUIRE()]}
                 errorText="Please enter a valid title"/>
          <Input label="Address"
                 type='text'
                 id='address'
                 onInput={inputHandler}
                 validators={[VALIDATOR_REQUIRE()]}
                 errorText="Please enter a valid address"/>
          <Input label="Description"
                 id='description'
                 onInput={inputHandler}
                 validators={[VALIDATOR_MINLENGTH(5)]}
                 errorText="Please enter a valid description (at least 5 characters)"/>
        </div>
        <ImageUpload onInput={inputHandler} center id='image' errorText='Please provide a valid image'/>

        <button
          className={`btn btn-block btn-primary col-span-2 ${!valid ? "btn-disabled" : ""} ${processing ? 'loading' : ''}`}
          type="submit"
          disabled={!valid}
        >
          Add Place
        </button>
      </form>
    </main>
  )
}