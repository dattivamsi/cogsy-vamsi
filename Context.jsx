import React, { createContext, useState } from 'react'

export const AuthContext = createContext();


function Context({children}) {
    const [products, setProducts] = useState([]);
  return (
    <AuthContext.Provider value={{ products, setProducts }}>
      {children}
    </AuthContext.Provider>
    
  )
}

export default Context