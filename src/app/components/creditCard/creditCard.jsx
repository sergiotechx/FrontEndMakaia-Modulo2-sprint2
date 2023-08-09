import React from 'react'
import { useForm } from "react-hook-form";
import { tickets } from '@/services/buyTickets';

const CreditCard = () => {
  const { register, formState: { errors }, watch, handleSubmit } = useForm({});
  const onSubmit = (data) => {
 
    tickets.value.readyToPay= true;
  }
  return (
    <div className='buy3CreditCard__Container'>
      <h4>Información personal</h4>
      <p>Completa los datos del formulario para relizar el pago</p>
      <form onSubmit={handleSubmit(onSubmit)}>

        <label>Correo electrónico</label>
        <input type="text"   {...register('email', {
          required: true,
          pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i
        })} />
        {errors.email?.type === 'pattern' && <p>El formato del email es incorrecto</p>}



        <label>Nombre en la tarjeta</label>
        <input type="text" {...register('name', {
          required: true,
          maxLength: 50
        })} />
        {errors.name?.type === 'required' && <p>El campo nombre es requerido</p>}
        {errors.name?.type === 'maxLength' && <p>El campo nombre debe tener menos de 50 caracteres</p>}

        <div className='CreditCard__Number'>
          <label>Número de la tarjeta</label>
          <div className='CreditCard__Number__Row'>
            <input type="number" maxlength="12" {...register('ccNumber', {
              required: true,
              maxLength: 12
            })} />
            <div>
              <input type="image" src="/images/visa.png" class="image_buscar" />
              <input type="image" src="/images/master.png" class="image_buscar" />
              <input type="image" src="/images/american.png" class="image_buscar" />
            </div>
            {errors.ccNumber?.type === 'required' && <p>El campo número de tarjeta  es requerido</p>}
            {errors.ccNumber?.type === 'maxLength' && <p>El campo número de tarjeta debe tener  12 cifras</p>}
          </div>
        </div>
        <div className='CreditCard__Security'>
         <div className='CreditCard__Security__Col'>
          <label>Fecha de caducidad</label>
          <input type="text" {...register('expDate', {
            required: true,
            maxLength: 5
          })} />
          {errors.expDate?.type === 'required' && <p>El campo fecha de caducidad  es requerido</p>}
          </div>
          <div className='CreditCard__Security__Col'>
          <label>CVV</label>
          <input type="number" {...register('cvv', {
            required: true,
            maxLength: 3
          })} />
          {errors.cvv?.type === 'required' && <p>El campo CVV es requerido</p>}
          {errors.cvv?.type === 'maxLength' && <p>El campo número de tarjeta debe tener  3 cifras</p>}
          </div>
        </div>
      </form>


    </div>
  )
}

export default CreditCard
