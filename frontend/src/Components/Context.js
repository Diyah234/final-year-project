import React, {createContext, useState} from 'react'


export const AppContext = createContext()

export const Context = ({children}) => {
    const [pop, setpop]= useState(false)
    const [logged, setLogged] = useState(false)
  return (
    <AppContext.Provider value={{pop,setpop, logged, setLogged}}>
        {children}
    </AppContext.Provider>
  )
}
