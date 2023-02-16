import classnames from '@/modules/utils/classnames'
import { ComponentProps } from 'react'

interface FormCheckboxProps extends ComponentProps<'input'> {
  label?: string
}

const FormCheckbox = ({ label, ...props }: FormCheckboxProps) => {
  return (
    <label htmlFor={props.id} className='cursor-pointer'>
      <input type='checkbox' {...props} hidden />
      <div className='flex flex-row items-center space-x-2'>
        <div
          className={classnames.merge([
            'relative h-5 w-5 rounded-md bg-stone-900'
          ])}
        >
          {props.checked ? (
            <div
              className={classnames.merge([
                'absolute flex h-full w-full items-center ',
                'justify-center text-xs text-primary'
              ])}
            >
              <span>&#10003;</span>
            </div>
          ) : (
            <div></div>
          )}
        </div>
        {label && <span className='leading-none'>{label}</span>}
      </div>
    </label>
  )
}

export default FormCheckbox
