import React from 'react'

type ContextTypeObject = {
  [key: string]: any
}

type ContextType<T extends ContextTypeObject> = {
  values: T
  setFieldValue: (key: string, value: string) => void
}

const Context = React.createContext<ContextType<ContextTypeObject>|null>(null)

type Props = {
  children: React.ReactNode
}

const FormProvider = <T extends ContextTypeObject>({ children }: Props) => {
  const [values, setValues] = React.useState<T>({} as T)

  const setFieldValue = (key: string, value: string) => {
    setValues(prev => ({
      ...prev,
      [key]: value
    }))
  }

  return (
    <Context.Provider value={{ values, setFieldValue }}>
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