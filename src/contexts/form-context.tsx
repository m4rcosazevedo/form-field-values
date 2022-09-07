import React from 'react'

type ContextTypeObject = {
  [key: string]: any
}

type ContextType<T extends ContextTypeObject> = {
  values: T
  setFieldValue: (key: string, value: string) => void
  clear: () => void
}

const Context = React.createContext<ContextType<ContextTypeObject>|null>(null)

type Props<T> = {
  children: React.ReactNode,
  initialValues?: T
}

export const FormProvider = <T extends ContextTypeObject>({ children, initialValues }: Props<T>) => {
  const [values, setValues] = React.useState<T>(initialValues as T ?? {})

  const setFieldValue = (key: string, value: string) => {
    setValues(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const clear = () => {
    setValues({} as T)
  }

  return (
    <Context.Provider value={{ values, setFieldValue, clear }}>
      {children}
    </Context.Provider>
  )
}

export const useForm = <T extends ContextTypeObject>() => {
  const context = React.useContext<ContextType<T>>((Context as unknown) as React.Context<ContextType<T>>)

  if (!context) {
    throw new Error('useForm must be used within a provider FormProvider')
  }

  return context
}


export function withForm(WrappedComponent: React.ComponentType) {
  const Component = () => {
    return (
      <FormProvider>
        <WrappedComponent />
      </FormProvider>
    )
  }

  return Component
}