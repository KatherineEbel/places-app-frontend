import {useNavigate, useParams} from "react-router-dom";
import Input from "../../shared/components/form-elements/Input";
import {VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from "../../shared/util/validators";
import {useForm} from "../../shared/hooks/use-form";
import {useEffect, useState} from "react";
import {useHttpClient} from "../../shared/hooks/use-http-client";
import Loader from "../../shared/components/loader/loader";
import {useAuth} from "../../shared/context/auth";

export default function UpdatePlace() {
  const [place, setPlace] = useState(null)
  const {user} = useAuth()
  const {processing, sendRequest} = useHttpClient();
  const navigate = useNavigate();
  const {inputs, valid, inputHandler, setFormData} = useForm({
    title: {
      value: '',
      valid: false,
    },
    description: {
      value: '',
      valid: false,
    },
  }, true);


  const {placeId} = useParams();

  const updatePlace = async (event) => {
    event.preventDefault();
    const body = Object.keys(inputs).reduce((acc, key) => {
      acc[key] = inputs[key].value;
      return acc;
    }, {})
    if (!placeId || !user) throw new Error('Place Id and User needed to update place');

    const data = await sendRequest(`/api/places/${placeId}`, 'PATCH', JSON.stringify(body),
      {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`
      });
    data && navigate(`/${user.id}/places`, {replace: true})
  }

  useEffect(() => {
    (async () => {
      if (!placeId) return;
      const data = await sendRequest(`/api/places/${placeId}`)
      data && setFormData({
        title: {
          value: data.title,
          valid: true,
        },
        description: {
          value: data.description,
          valid: true,
        },
      }, true);
      setTimeout(() => {
          setPlace(data)
        }
        , 100)
    })()
  }, [placeId, sendRequest, setFormData])

  if (!place) return (
    <main className='grid place-items-center min-h-screen'>
      <Loader/>
    </main>
  )

  return (
    <main className='grid place-items-center mt-8'>
      <div className='card card-bordered bg-base-300 shadow-xl w-80'>
        <div className='card-body place-items-center'>
          <h1 className='card-title'>Update Place</h1>
          <form id='update-place-form' className='w-full' onSubmit={updatePlace}>
            <Input type='text' id='title' value={inputs.title.value} validators={[VALIDATOR_REQUIRE()]}
                   errorText='Title is required'
                   onInput={inputHandler}
                   valid={inputs.title.valid}
            />
            <Input id='description' value={inputs.description.value} validators={[VALIDATOR_MINLENGTH(5)]}
                   errorText='A valid description is at least 5 characters long'
                   onInput={inputHandler}
                   valid={inputs.description.valid}
            />
          </form>
          <div className='card-actions'>
            <button className='btn btn-link btn-secondary'
                    onClick={() => navigate(-1)}
            >Cancel</button>
            <button
              form='update-place-form'
              className={`btn btn-primary ${!valid ? "btn-disabled" : ""} ${processing ? 'loading' : ''}`}
              type="submit"
              disabled={!valid}
            >
              Update place
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}