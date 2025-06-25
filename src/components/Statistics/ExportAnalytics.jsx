import { Download } from 'lucide-react'

const ExportAnalytics = () => {
  return (
    <div className="flex mt-4 gap-2">
      <button className="bg-white text-black rounded-lg w-30 h-10 font-semibold hover:bg-slate-200 transition-colors duration-300">
        <Download className="inline mr-2 size-5" />
        Export CSV
      </button>
      <button className="bg-white text-black rounded-lg w-30 h-10 font-semibold hover:bg-slate-200 transition-colors duration-300">
        <Download className="inline mr-2 size-5" />
        Export PDF
      </button>
    </div>
  )
}

export default ExportAnalytics
