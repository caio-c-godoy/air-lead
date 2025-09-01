
import '../globals.css'

export async function generateStaticParams(){
  return [{locale:'en'},{locale:'pt'},{locale:'es'}]
}

export default function LocaleLayout({children, params}:{children:React.ReactNode, params:{locale:string}}){
  return (
    <html lang={params.locale}>
      <body>{children}</body>
    </html>
  )
}
