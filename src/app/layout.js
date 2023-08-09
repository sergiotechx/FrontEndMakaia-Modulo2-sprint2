'use client'
import NavBar from './components/NavBar/NavBar'
import { Inter } from 'next/font/google'
import './styles/general.scss'
import { MantineProvider } from '@mantine/core'
import MoviesCarousel from './containers/carousel/MoviesCarousel'
import {  usePathname } from 'next/navigation'




const inter = Inter({ subsets: ['latin'] })

/*export const metadata = {
  title: 'Copia Cine Colombia',
  description: '😵‍💫',
}*/

export default function RootLayout({ children }) {
  const currentPath = usePathname().split('/');


  return (
    <html lang="es">
     <body className={inter.className}>
     <MantineProvider
        withCSSVariables 
        withNormalizeCSS
     
        theme={{
          /** Put your mantine theme override here */
          colorScheme: 'dark',
          components :{
            Select:{
              classNames: { root: 'select-root', label: 'select-label' },
            }
          }
        
        }}
     >
    
     <NavBar/>
    {currentPath[1]!='admin'&& <MoviesCarousel/>}
    </MantineProvider>
   
      {children}
     
     
      </body>
    </html>
  )
}
