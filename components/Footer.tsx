
export default function Footer({t}:{t:(k:string)=>string}){
  return (
    <footer className="bg-gray-900 text-white py-8 mt-16">
      <div className="container text-center text-sm">
        <p>© {new Date().getFullYear()} Victorious Company — {t('footer.copy')}</p>
        <p className="mt-2 opacity-80">{t('footer.motto')}</p>
      </div>
    </footer>
  )
}
