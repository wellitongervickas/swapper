import classnames from '@/modules/utils/classnames'
import { ComponentProps } from 'react'

interface FormCheckboxProps extends ComponentProps<'input'> {
  label?: string
}

const FormCheckbox = ({ label, ...props }: FormCheckboxProps) => {
  return (
    <div className='flex flex-row items-center space-x-2'>
      <input type='checkbox' {...props} hidden />
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
      {label && (
        <label htmlFor={props.id} className='cursor-pointer leading-none'>
          {label}
        </label>
      )}
    </div>
  )
}

export default FormCheckbox
