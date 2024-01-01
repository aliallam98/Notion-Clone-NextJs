import React from 'react'
import { Button } from './ui/button'
import Logo from './Logo'

const Footer = () => {
  return (
    <footer className="flex justify-between items-center p-6 border-t">
        <Logo />
        <div className="flex items-center  text-muted-foreground">
          <Button size="sm" variant="ghost">Privacy Policy</Button>
          <Button size="sm" variant="ghost">Terms & Conditions</Button>
        </div>
    </footer>
  )
}

export default Footer
